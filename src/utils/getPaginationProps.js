const getPaginationProps = meta => {
  return {
    current: meta.page,
    pageSize: meta.perPage,
    total: meta.total,
    hideOnSinglePage: true,
    onChange: page => {
      this.handleChangePage(page);
    },
  };
};

export default getPaginationProps;
