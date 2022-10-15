export default {
  INITIAL_ROLES: [
    { 
      name: 'administrator', 
      description: 'Administrator', 
      access: [
        'home_manager_type00',
        'user_manager_type00',
      ],
      enabled: true 
    },
    {
      name: 'moderator', 
      description: 'Moderator', 
      access: [
        'home_manager_type00',
        'user_manager_type01',
      ],
      enabled: true 
    },
    {
      name: 'user', 
      description: 'User', 
      access: [
        'home_manager_type00'
      ],
      enabled: true 
    }
  ],
  INITIAL_ACCESS: [
    {
      name: 'home_manager_type00',
      description: 'Home manager basic options.',
      enabled: true,
      actions: [
        'home_page',
      ]
    },
  ],
  INITIAL_MODULES: [
    { 
      name: 'home_page',
      description: 'Home page module.',
      actions: [
        {
          name: 'home_page', 
          description: 'Home page.', 
          url: '/',
          request: 'get',
          enabled: true
        }
      ]
    }
  ],
  INITIAL_STATUS: [
    {
      kind: 'global',
      name: 'enabled',
      description: 'Item enabled'
    }
  ]
}
