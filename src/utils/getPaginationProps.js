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

export const initialPaginationState = {
  count: 0,
  page: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default getPaginationProps;
