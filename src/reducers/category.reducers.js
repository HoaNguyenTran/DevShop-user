import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  const { _id, name, slug, children } = category;

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id,
        name,
        slug,
        children,
      },
    ];
  } else {
    for (const cat of categories) {
      if (cat._id === parentId) {
        const newCat = {
          _id,
          name,
          slug,
          children,
        };
        myCategories.push({ ...cat, children: [...cat.children, newCat] });
      } else {
        myCategories.push({
          ...cat,
          children:
            cat.children.length > 0
              ? buildNewCategories(parentId, cat.children, category)
              : [],
        });
      }
    }
  }
  return myCategories;
};

const cateroryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const { category } = action.payload;
      const updateCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        loading: false,
        categories: updateCategories,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default cateroryReducer;
