export default {
  ADMIN_ACCESS: [
    {
      name: 'permission_manager_type00',
      description: 'Permission manager administration options.',
      enabled: true,
      actions: [
        'permission_byRole',
        'permission_list',
        'permission_delete',
        'permission_create',
        'permission_update'
      ]
    },
    {
      name: 'access_manager_type00',
      description: 'Access manager administration options.',
      enabled: true,
      actions: [
        'access_byAccess',
        'access_list',
        'access_delete',
        'access_create',
        'access_update'
      ]
    },
  ],
  ADMIN_MODULES: [
    { 
      name: 'permission_page',
      description: 'Permission page module.',
      actions: [
        {
          name: 'permission_list', 
          description: 'Permission list.', 
          url: '/auth/permission',
          method: 'GET',
          enabled: true
        },
        {
          name: 'permission_delete', 
          description: 'Permission delete.',
          url: '/auth/permission/:id',
          method: 'DELETE',
          enabled: true
        },
        {
          name: 'permission_create', 
          description: 'Permission create.', 
          url: '/auth/permission',
          method: 'POST',
          enabled: true
        },
        {
          name: 'permission_update', 
          description: 'Permission update.', 
          url: '/auth/permission/:id',
          method: 'PUT',
          enabled: true
        },
        {
          name: 'permission_byRole', 
          description: 'Permission by Role.', 
          url: '/auth/permission/:role',
          method: 'GET',
          enabled: true
        },
      ]
    },
    { 
      name: 'access_page',
      description: 'Access page module.',
      actions: [
        {
          name: 'access_list', 
          description: 'Access list.', 
          url: '/auth/access',
          method: 'GET',
          enabled: true
        },
        {
          name: 'access_delete', 
          description: 'Access delete.',
          url: '/auth/access/:id',
          method: 'DELETE',
          enabled: true
        },
        {
          name: 'access_create', 
          description: 'Access create.', 
          url: '/auth/access',
          method: 'POST',
          enabled: true
        },
        {
          name: 'access_update', 
          description: 'Access update.', 
          url: '/auth/access/:id',
          method: 'PUT',
          enabled: true
        },
        {
          name: 'access_byRole', 
          description: 'Access by Role.', 
          url: '/auth/access/:access',
          method: 'GET',
          enabled: true
        },
      ]
    },
  ]
}
