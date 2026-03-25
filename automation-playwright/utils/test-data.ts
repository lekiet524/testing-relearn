
export const users = {
    stand: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    locked: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    empty: {
        username: '',
        password: ''
    }
}

export const errorMessage = {
    loginInValidCreditials:'Epic sadface: Username and password do not match any user in this service',
    requiredUsername: 'Epic sadface: Username is required',
    requiredPassword: 'Epic sadface: Password is required',
    lockedUsername: 'Epic sadface: Sorry, this user has been locked out.',
}