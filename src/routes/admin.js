export default {
    path: '/admin',
    name: 'admin',
    // meta: {
    //     forAuth: true
    // },
    component: () => import('@/views/admin/Admin.vue'),
    children: [{
            path: '',
            component: () => import('@/views/admin/Dashboard.vue'),
        },
        {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/admin/Dashboard.vue'),
        },
        {
            path: 'content',
            name: 'content',
            component: () => import('@/views/admin/content/Content.vue'),
        },
        {
            path: 'content/add',
            name: 'content-add',
            component: () => import('@/views/admin/content/input.vue')
        },
        {
            path: 'report',
            name: 'report',
            component: () => import('@/views/admin/content/Report.vue'),
        },
       

      

    ]
}