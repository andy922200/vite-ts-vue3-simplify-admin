const helloRouter = {
    path: '/hello',
    redirect: '/hello/index',
    component: 'Layout',
    name: 'helloModule',
    meta: {
        title: 'helloModule',
        icon: 'goods',
        alwaysShow: true,
        permissions: [
            'admin-default'
        ]
    },
    children: [
        {
            path: 'index',
            component: 'hello/index',
            name: 'HelloIndex',
            meta: {
                title: 'helloIndex',
                icon: 'order',
                keepAlive: true,
                permissions: [
                    'admin-default'
                ]
            }
        }
    ]
}

export default helloRouter
