import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Maria Popescu',
        email: 'maria@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Andreea Vasile',
        email: 'andreea@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Mircea Tanase',
        email: 'mircea@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users