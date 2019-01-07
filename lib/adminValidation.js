const adminValidation = me => {
  if (me) {
    return me.permissions.includes('ADMIN');
  }
};

export default adminValidation;
