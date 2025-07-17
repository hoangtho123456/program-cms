declare namespace Objects {
  interface IObjectOne {
    id: number | string | NoneValue;
    name: string;
    price: number;
  }
  interface ILab {
    id: IDType;
    name: string | NoneValue;
    logoUrl: string | NoneValue;
    address: string | NoneValue;
    category: {
      id: IDType;
      name: string | NoneValue;
    }
  }
  interface IRequestQuery {
    sortByKey: string;
    page: number | NoneValue;
    limit: number | NoneValue;
  }
}
