import puppeteer from 'puppeteer'

class ProtonMail {
  /**
   * Get a ProtonMail instance that is connected and ready to use.
   * @param {Object} config
   * @param {Object} config.username Required, can be ProtonMail username or email
   * @param {Object} config.password Required
   * @param {Object} config.puppeteerOpts puppeteer launch options
   * @return {ProtonMail}
   */
  static async connect (config) {
    const protonMail = new ProtonMail(config)
    await protonMail._connect()
    return protonMail
  }

  constructor (config) {
    this._config = config
    this._config.puppeteerOpts = config.puppeteerOpts || {}

    if (!config.username) {
      throw new Error('config.username is required')
    }

    if (!config.password) {
      throw new Error('config.password is required')
    }
  }

  async _connect () {
    if (this._browser === undefined) {
      this._browser = await puppeteer.launch({ headless: true, ...this._config.puppeteerOpts })
      this._page = await this._browser.newPage()
    }

    const page = this._page

    await page.goto('https://account.proton.me/login')
    await page.waitForSelector('button[type=submit]')
    await page.type('#username', this._config.username)
    await page.type('#password', this._config.password)
    await page.click('button[type=submit]')
    await page.waitForSelector('.sidebar')
    let invalidLogin = false
    await Promise.race([
      page.waitForSelector('.notification-container.notification.bg-danger').then(() => { invalidLogin = true })
    ])
    if (invalidLogin) {
      throw new Error('Invalid username and/or password')
    }
    await page.evaluate(() => {
      window.conversationApi = window.angular.element(document.body).injector().get('conversationApi')
      window.labelsModel = window.angular.element(document.body).injector().get('labelsModel')
      window.labelModel = window.angular.element(document.body).injector().get('Label')
      window.MessageModel = window.angular.element(document.body).injector().get('messageModel')
      window.addressesModel = window.angular.element(document.body).injector().get('addressesModel')
      window.messageApi = window.angular.element(document.body).injector().get('messageApi')
      window.encryptMessage = window.angular.element(document.body).injector().get('encryptMessage')
    })

    this._accountAddressData = await page.evaluate(() => {
      return window.addressesModel.getFirst()
    })
  }

    /**
   * Send an email.
   * @param {Object} options
   * @param {Address|string} options.to
   * @param {string} options.subject
   * @param {string} options.body
   * @return {Email}
   */
  async sendEmail (options) {
    const { to, subject, body } = options
    const data = {
      toList: [{ Name: to, Address: to }],
      subject,
      body,
      address: this._accountAddressData
    }

    const emailId = await this._page.evaluate(async (data) => {
      const message = window.MessageModel()
      message.AddressID = data.address.ID
      message.From = data.address
      message.Password = ''
      message.AutoSaveContacts = 0
      message.ToList = data.toList
      message.Subject = data.subject
      message.setDecryptedBody(data.body)
      const encryptedBody = await message.encryptBody(data.address.Keys[0].PublicKey)

      const draftData = {
        Message: {
          AddressID: message.AddressID,
          Body: encryptedBody,
          Subject: message.Subject,
          ToList: message.ToList,
          CCList: [],
          BCCList: [],
          Unread: 0,
          Sender: { Name: message.From.DisplayName || '', Address: message.From.Email }
        }
      }

      const draftResponse = await window.messageApi.createDraft(draftData)
      message.ID = draftResponse.data.Message.ID
      message.MIMEType = draftResponse.data.Message.MIMEType
      const packages = await window.encryptMessage(message, message.emailsToString())

      await window.messageApi.send({
        id: message.ID,
        AutoSaveContacts: message.AutoSaveContacts,
        ExpirationTime: message.ExpirationTime,
        Packages: packages
      })

      return message.ID
    }, data)

    return this.getEmail(emailId)
  }
}

module.exports = ProtonMail
