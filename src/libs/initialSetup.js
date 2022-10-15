import config from '../config';
import Access from '../models/access';
import Action from '../models/action';
import Module from '../models/module';
import Role from '../models/role';
import Status from '../models/status';


/**
 * Function to set initial configuration
 */
export const initialConfiguration = async () => {
  createStatus();
  createModules();
  createAccess();
  createRoles();
}

/**
 * Function to create the initial access of the system.
 */
const createAccess = () => {
  config.INITIAL_ACCESS.forEach(async access => {
    let actions = [];

    await Promise.all(
      access.actions.map(async action => {
        let model = await Action.findOne({ name: action }).exec();

        if (model) {
          actions.push(model._id);
        }
      })
    );
  
    const accessModel = await Access.findOne({ name: access.name });
  
    if (accessModel) {
      accessModel.actions = actions;
      await accessModel.save();
    } else {
      const newAccess = Access({ ...access, actions: actions });
      await newAccess.save();
    }
  });
}

/**
 * Function to create the initial modules actions of the system.
 */
const createModules = () => {
  config.INITIAL_MODULES.forEach(async x => {
    let findModule = await Module.findOne({ name: x.name, }).exec();

    if (!findModule) {
      const module = new Module({
        name: x.name,
        description: x.description,
        enabled: true
      });

      await module.save();
    }

    x.actions.forEach(async y => {
      let findAction = await Action.findOne({ name: y.name }).exec();

      if (!findAction) {
        const currentModule = await Module.findOne({ name: x.name, }).exec();
        const action = new Action({
          ...y,
          module: currentModule._id
        });

        await action.save();
      }
    });
  });
}

/**
 * Function to create the initial roles of the system.
 */
const createRoles = () => {
  config.INITIAL_ROLES.forEach(async role => {
    let accesses = [];

    await Promise.all(
      role.access.map(async access => {
        let model = await Access.findOne({ name: access }).exec();

        if (model) {
          accesses.push(model._id);
        }
      })
    );

    const roleModel = await Role.findOne({ name: role.name }).exec();

    if (roleModel) {
      roleModel.access = accesses;
      await roleModel.save();
    } else {
      const newRole = new Role({ ...role, access: accesses });
      await newRole.save();
    }
  });
}

/**
 * Function to create the initial status of the system.
 */
const createStatus = () => {
  config.INITIAL_STATUS.forEach(async status => {
    const condition = { name: status.name, kind: status.kind };
    const statusModel = await Status.findOne(condition).exec();
  
    if (statusModel) {
      statusModel.description = status.description;
      statusModel.kind = status.kind;
      await statusModel.save();
    } else {
      const newStatus = new Status({ ...status });
      await newStatus.save();
    }
  });
}
