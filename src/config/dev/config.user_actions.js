export default {
  OTHER_ACCESS: [
    {
      name: 'user_manager_type00',
      description: 'User manager administration options.',
      enabled: true,
      actions: [
        'user_byId',
        'user_list',
        'user_delete',
        'user_create',
        'user_update'
      ]
    },
    {
      name: 'user_manager_type01',
      description: 'User manager moderator options.',
      enabled: true,
      actions: [
        'user_byId',
        'user_list',
        'user_create',
        'user_update'
      ]
    }
  ],
  OTHER_MODULES: [
    { 
      name: 'user_page',
      description: 'User page module.',
      actions: [
        {
          name: 'user_list', 
          description: 'User list.', 
          url: '/user',
          method: 'GET',
          enabled: true
        },
        {
          name: 'user_delete', 
          description: 'User delete.',
          url: '/user/:id',
          method: 'DELETE',
          enabled: true
        },
        {
          name: 'user_create', 
          description: 'User create.', 
          url: '/user',
          method: 'POST',
          enabled: true
        },
        {
          name: 'user_update', 
          description: 'User update.', 
          url: '/user/:id',
          method: 'PUT',
          enabled: true
        },
        {
          name: 'user_byId', 
          description: 'User by Id.', 
          url: '/user/:id',
          method: 'GET',
          enabled: true
        },
      ]
    }
  ]
}
