// Create a user so that server can be authenticated by MongoDB container
db.createUser({
  user: 'server',
  pwd: '68FPB4Aa8',
  roles: [
    {
      role: 'dbOwner',
      db: 'diet_accountability_app',
    },
  ],
});
