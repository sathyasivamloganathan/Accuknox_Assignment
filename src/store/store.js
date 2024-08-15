import { create } from "zustand";

const useStore = create((set) => ({
  categoryList: [
    { id: 1, category: "CSPP" },
    { id: 2, category: "CMP" },
  ],
  widgets: [
    {
      id: 1,
      widgetName: "Aws",
      widgetCategory: "CSPP",
      widgetDescription: "Aws monitoring system",
    },
    {
      id: 2,
      widgetName: "Google",
      widgetCategory: "CSPP",
      widgetDescription: "Google monitoring system",
    },
    {
      id: 3,
      widgetName: "Azure",
      widgetCategory: "CMP",
      widgetDescription: "Azure monitoring system",
    },
  ],
  search: "",
  filteredList: [],
  toggle: false,

  setSearch: (search) => set({ search }),

  setToggle: (toggle) => set({ toggle }),

  addCategory: (categoryName) =>
    set((state) => {
      const newCategory = {
        id: state.categoryList.length + 1,
        category: categoryName.trim(),
      };
      return {
        categoryList: [...state.categoryList, newCategory],
        filteredList: [...state.categoryList, newCategory],
      };
    }),

  deleteCategory: (id) =>
    set((state) => {
      const newList = state.categoryList.filter((item) => item.id !== id);
      return {
        categoryList: newList,
        filteredList: newList,
      };
    }),

  addWidget: (widget) =>
    set((state) => ({
      widgets: [...state.widgets, widget],
    })),

  deleteWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((widget) => widget.id !== id),
    })),

  handleSearch: () =>
    set((state) => {
      const lowercasedSearch = state.search.toLowerCase();

      const filtered = state.categoryList.filter((category) => {
        const categoryMatches = category.category
          .toLowerCase()
          .includes(lowercasedSearch);
        const matchingWidgets = state.widgets.filter(
          (widget) =>
            widget.widgetCategory === category.category &&
            widget.widgetName.toLowerCase().includes(lowercasedSearch)
        );

        return categoryMatches || matchingWidgets.length > 0;
      });

      const updatedFilteredList = filtered.map((category) => {
        const matchingWidgets = state.widgets.filter(
          (widget) =>
            widget.widgetCategory === category.category &&
            widget.widgetName.toLowerCase().includes(lowercasedSearch)
        );
        return {
          ...category,
          widgets: matchingWidgets,
        };
      });

      return { filteredList: updatedFilteredList };
    }),
}));

export default useStore;
