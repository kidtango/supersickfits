const cartTotalItems = cart => {
  return cart.reduce((tally, item) => {
    if (item.item === null) {
      return tally + 0;
    } else {
      return tally + item.quantity;
    }
  }, 0);
};

export default cartTotalItems;
