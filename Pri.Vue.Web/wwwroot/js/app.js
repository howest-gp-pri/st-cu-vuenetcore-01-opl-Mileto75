
//put Vue code here
let app = new Vue({
    el: "#app",
    data: {
        pageTitle: "Vue product shop",
        categoriesVisible: false,
        baseUrl: 'https://localhost:44326/api',
        categories: null,
        loading: false,
        hasError: false,
        errorMessage: "",
        productsVisible: false,
        products: null,
        product: {
            name: "",
            price: "",
            category: "",
            properties: [],
            image: null,
        }
        
    },
    methods: {
        getCategories: async function () {
            this.productsVisible = false;
            //reset error
            this.hasError = false;
            //toggle the categoriesVisible property
            this.categoriesVisible = !this.categoriesVisible;
            //get the categories from the api
            const categoriesUrl = `${this.baseUrl}/categories`;
            this.loading = true;
            this.categories = await axios.get(categoriesUrl)
                .then(response => response.data.items)
                .catch(error => {
                    this.hasError = true;
                    this.errorMessage = error.message;
                })
                .finally(() => { this.loading = false; })
        },
        getProducts: async function (categoryId) {
            let url = `${this.baseUrl}/products`;
            if (categoryId !== undefined) {
                url += `/category/${categoryId}`;
            }
            this.categoriesVisible = false;
            this.hasError = false;
            this.loading = true;
            this.products = await axios.get(url)
                .then(response => response.data)
                .catch(error => {
                    this.errorMessage = error.message;
                    this.hasError = true;
                })
                .finally(() => { this.loading = false; });
            this.productsVisible = !this.productsVisible;
        },
        showProductInfo: async function (id) {

            this.hasError = false;
            const url = `${this.baseUrl}/products/${id}`;
            this.loading = true;
            this.product = await axios.get(url)
                .then(response => response.data)
                .catch(error => {
                    this.hasError = true;
                    this.errorMessage = error.Message;
                })
                .finally(() => {
                    this.loading = false;
                })
            $('#productInfo').modal('show');
        },
        hideProductInfo: function () {
            $('#productInfo').modal('hide');
        },
    },
});