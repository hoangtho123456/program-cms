import newsRes from '@/mockData/news.json';
import programRes from '@/mockData/programs.json';

const types = {
  program: 'program',
  news: 'news'
}

export default {
  list (params = {}) {
    let list = [];
    switch (params?.type) {
      case types.news:
        list = [...newsRes.list];
        break;
      default:
        list = [...programRes.list];
        break;
    }

    if (params.from) {
      list = list.filter(item => {
        const createdDate = new Date(item.createdDate);
        const conditionDate = new Date(params.from);

        return createdDate.getTime() >= conditionDate.getTime();
      });
    }

    if (params.to) {
      list = list.filter(item => {
        const createdDate = new Date(item.createdDate);
        const conditionDate = new Date(params.to);

        return createdDate.getTime() <= conditionDate.getTime();
      });
    }

		return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list);
      }, 2000)
    });
	},
};
