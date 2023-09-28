// Create a user so that server can be authenticated by MongoDB container
db.createUser({
  user: 'server',
  pwd: 'secreto',
  roles: [
    {
      role: 'dbOwner',
      db: 'diet_accountability_app',
    },
  ],
});
