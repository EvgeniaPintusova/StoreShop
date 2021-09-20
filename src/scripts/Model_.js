/**
 * Model class. Knows everything about API endpoint and data structure.
 *
 * @constructor
 */
function Model() {
  /**
   * URL template for getting data from the server
   * @type {string}
   *
   * @example productsOfStoreUrlTemplate.replace("{id}", storeId)
   *
   * @private
   */
  let apiPrefix = "http://localhost:3000/api";
  let allStoresUrlTempllate = apiPrefix + "/Stores";
  let storeUrlTemplate = apiPrefix + "/Stores/{id}";
  let productsOfStoreUrlTemplate = apiPrefix + "/Stores/{id}/rel_Products";
  let searchStoreFromListUrlTemplate =
    apiPrefix +
    '/Stores?filter={"where":{"and":[{"or":[{"Name":{"regexp":"/{filter}/i"}}, {"Address":{"regexp":"/{filter}/i"}}]}]}}';
  let searchProductsUrlTemplate =
    apiPrefix +
    `/Stores/{selectedStoreId}/rel_Products?filter={"where":{"and":[{"or":[{"Name":{"regexp":"/{filter}/i"}},{"Specs":{"regexp":"/{filter}/i"}},{"SupplierInfo":{"regexp":"/{filter}/i"}},{"MadeIn":{"regexp":"/{filter}/i"}},{"ProductionCompanyName":{"regexp":"/{filter}/i"}},{"Price":{"like":"{filter}"}}]}]}}`;
  let deleteProductInStoreUrlTemplate =
    apiPrefix + `/Stores/{storeId}/rel_Products/{productId}`;
  let deleteStoreUrltemplate = apiPrefix + "/Stores/{id}";
  let addStoreUrlTemplate = apiPrefix + "/Stores";
  let addProductToStoreTemplate = apiPrefix + "/Stores/{id}/rel_Products";
  let getProductToEditTemplate =
    apiPrefix + "/Stores/{storeId}/rel_Products/{productId}";
  let postEditProductTemplate =
    apiPrefix + "/Stores/{storeId}/rel_Products/{productId}";
  /**
   * The link to the currently selected model-objects.
   * @type {Object}
   * @private
   */
  let selectedStoreId = null;
  let productsOfSelectedStore = null;

  /**
   * Commot fetch template for requests.
   *
   * @param {String} method - the method of getting data.
   * @param {String} url - the link of request.
   * @param {Object} body - object to PUT, POST requests.
   *
   * @returns {Promise} the promise object will be resolved once requests get loaded.
   *
   * @public
   */
  this.fetchData = (method, url, body = null) => {
    return new Promise(function(resolve, reject) {
      const req = new XMLHttpRequest();
      req.open(method, url);
      req.addEventListener("load", function() {
        if (req.status < 400) {
          resolve(req.response);
        } else {
          reject(new Error("Request failed: " + req.statusText));
        }
      });
      req.addEventListener("error", function() {
        reject(new Error("Network error"));
      });
      req.responseType = "json";
      req.setRequestHeader("Content-type", "application/json");
      if (method === "POST" || method === "PUT") {
        req.send(JSON.stringify(body));
      } else {
        req.send();
      }
    });
  };

  /**
   * Fetch all stores from the data-base.
   *
   *
   * @returns {Promise} the promise object will be resolved once the Stores List gets loaded.
   *
   * @public
   */
  this.getStoresList = () => {
    return this.fetchData("GET", allStoresUrlTempllate).then(function(stores) {
      return stores;
    });
  };
  /**
   * Fetch the data store by id.
   *
   * @param {String} storeId the store id.
   *
   * @returns {Promise} the promise object will be resolved once the Store object will be loaded.
   *
   * @public
   */
  this.findStoreById = (storeId) => {
    return this.fetchData(
      "GET",
      storeUrlTemplate.replace("{id}", storeId)
    ).then(function(store) {
      selectedStoreId = store.id;
      return store;
    });
  };

  /**
   * Fetch the data about products of store.
   *
   * @param {String} storeId the selected store id.
   *
   * @returns {Promise} the promise object will be resolved once the product objects will be loaded.
   *
   * @public
   */
  this.findProductsOfStore = (storeId = selectedStoreId) => {
    return this.fetchData(
      "GET",
      productsOfStoreUrlTemplate.replace("{id}", storeId)
    ).then(function(products) {
      productsOfSelectedStore = products;
      return products;
    });
  };

  /**
   * Method to get all of products in choosen store.
   *
   * @returns {{Object[]}}
   *
   * @public
   */
  this.getAllProducts = () => {
    return productsOfSelectedStore;
  };

  /**
   * Method to get of products using status in choosen store.
   *
   * @param {String} status the status of product.
   *
   * @returns {{Object[]}}
   *
   * @public
   */
  this.getProductsStatus = (status) => {
    const result = productsOfSelectedStore.filter(
      (product) => product.Status.toLowerCase() === status.toLowerCase()
    );
    return result;
  };

  /**
   * Fetch the data about stores with filter.
   *
   * @param {Object} filter object with values of searching.
   *
   * @returns {Promise} the promise object will be resolved once the store objects will be loaded.
   *
   * @public
   */
  this.searchStore = (filter) => {
    let url = searchStoreFromListUrlTemplate.replaceAll("{filter}", filter);
    return this.fetchData("GET", url).then(function(storesFilter) {
      return storesFilter;
    });
  };

  /**
   * Fetch the data about stores with filter.
   *
   * @param {Object} filter object with values of searching.
   *
   * @returns {Promise} the promise object will be resolved once the product objects will be loaded.
   *
   * @public
   */
  this.searchProductsInStore = (filter) => {
    let url = searchProductsUrlTemplate
      .replaceAll("{filter}", filter)
      .replace("{selectedStoreId}", selectedStoreId);
    return this.fetchData("GET", url).then(function(productsFilter) {
      productsOfSelectedStore = productsFilter;
      return productsFilter;
    });
  };

  /**
   * Fetch to delete data about product
   *
   * @param {number} productId  id of product needed to delete.
   * @param {number} storeId  id of store where changes are.
   *
   * @returns {Promise} the promise object will be resolved once the product object will be deleted.
   *
   * @public
   */
  this.deleteProductOfStore = (productId, storeId = selectedStoreId) => {
    let url = deleteProductInStoreUrlTemplate
      .replace("{storeId}", storeId)
      .replace("{productId}", productId);
    return this.fetchData("DELETE", url);
  };

  /**
   * Fetch to delete data about store
   *
   * @returns {Promise} the promise object will be resolved once the choosen store object will be deleted.
   *
   * @public
   */
  this.deleteStore = () => {
    return this.fetchData(
      "DELETE",
      deleteStoreUrltemplate.replace("{id}", selectedStoreId)
    ).then(() => {
      selectedStoreId = null;
      productsOfSelectedStore = null;
    });
  };

  /**
   * Fetch to add data about store
   *
   * @param {object} values includes data of new store
   *
   * @returns {Promise} the promise object will be resolved once the store object will be added.
   *
   * @public
   */
  this.addStore = (values) => {
    return this.fetchData("POST", addStoreUrlTemplate, {
      Name: `${values[0]}`,
      Email: `${values[1]}`,
      PhoneNumber: `${values[2]}`,
      Address: `${values[3]}`,
      Established: `${values[4]}`,
      FloorArea: `${+values[5]}`,
    });
  };

  /**
   * Fetch to add data about product
   *
   * @param {object} values includes data of new store
   * @param {number} id id of store where product should be added
   *
   * @returns {Promise} the promise object will be resolved once the product object will be added.
   *
   * @public
   */
  this.addProduct = (values, id = selectedStoreId) => {
    return this.fetchData(
      "POST",
      addProductToStoreTemplate.replace("{id}", id),
      {
        Name: `${values[0]}`,
        Price: `${+values[1]}`,
        Photo: `photo`,
        Specs: `${values[2]}`,
        Rating: `${+values[3]}`,
        SupplierInfo: `${values[4]}`,
        MadeIn: `${values[5]}`,
        ProductionCompanyName: `${values[6]}`,
        Status: `${values[7]}`,
        StoreId: `${selectedStoreId}`,
      }
    );
  };

  /**
   * Fetch to get data about product
   *
   * @param {number} storeId id of store where product should be getting
   * @param {number} productId id of product which data should be getting
   *
   * @returns {Promise} the promise object will be resolved once the product object will be load.
   *
   * @public
   */
  this.getProductToEdit = (productId, storeId = selectedStoreId) => {
    let url = getProductToEditTemplate
      .replace("{storeId}", storeId)
      .replace("{productId}", productId);
    return this.fetchData("GET", url).then((product) => {
      return product;
    });
  };

  /**
   * Fetch to get data about product
   *
   * @param {number} storeId id of store where product should be change
   * @param {number} productId id of product which data should be getting
   *
   * @returns {Promise} the promise object will be resolved once the product object will be change.
   *
   * @public
   */
  this.editProduct = (values, productId, storeId = selectedStoreId) => {
    let url = postEditProductTemplate
      .replace("{storeId}", storeId)
      .replace("{productId}", productId);
    return this.fetchData("PUT", url, {
      Name: `${values[0]}`,
      Price: `${+values[1]}`,
      Photo: `photo`,
      Specs: `${values[2]}`,
      Rating: `${+values[3]}`,
      SupplierInfo: `${values[4]}`,
      MadeIn: `${values[5]}`,
      ProductionCompanyName: `${values[6]}`,
      Status: `${values[7]}`,
      StoreId: `${storeId}`,
      Id: `${productId}`,
    });
  };

  this.orderProducts = (field) => {
    console.log("sort", selectedStoreId);
    let url = `http://localhost:3000/api/Stores/${selectedStoreId}/rel_Products?filter = {order: '${field}<ASC>'}`;
    return this.fetchData("GET", url).then((sortProducts) => {
      return sortProducts;
    });
  };
}
