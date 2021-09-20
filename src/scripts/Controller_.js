/**
 * Controller class. Orchestrates the model and view objects.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
function Controller(view, model) {
  const that = this;
  /**
   * Initialize controller.
   *
   * @public
   */
  this.init = () => {
    this.renderStoresList();
    const storeListDelegate = view.getStoresListContainer();
    const editProductsDelegate = view.getProductsListContainer();
    const allProductsButton = view.getAllCountOfProductsButton();
    const okProductsButton = view.getOkStatusProductsButton();
    const storageProductsButton = view.getStorageStatusProductsButton();
    const outProductsButton = view.getOutStatusProductsButton();
    const searchStoreButton = view.getSearchStoreButton();
    const searchProductButton = view.getSearchProductsButton();
    const defaultSearchProductsButton = view.getDefaultSearchProductsButton();
    const defaultSearchStoreButton = view.getDefaultSearchStoreButton();
    const delelteStoreButton = view.getDeleteSelectedStoreButton();
    const addNewProductButton = view.getAddNewProductButton();
    const addNewStoreButton = view.getAddNewStoreButton();
    const closeCreateStoreFormButton = view.getCloseCreateStoreForm();
    const closeCreateProductFormButton = view.getCloseCreateProductForm();
    const closeEditProductFormButton = view.getCloseEditProductForm();
    const confirmToCreateStoreButton = view.getConfirmToCreateStoreButton();
    const confirmToAddProductButton = view.getConfirmToAddProductButton();
    const confirmToEditProductButton = view.getConfirmEditProduct();

    searchProductButton.addEventListener("click", (event) => {
      that.searchProducts(event);
    });
    storeListDelegate.addEventListener("click", (event) => {
      that.selectStoreFromList(event);
    });
    editProductsDelegate.addEventListener("click", (event) => {
      that.editProductTarget(event);
    });
    allProductsButton.addEventListener("click", function() {
      view.displayProducts(model.getAllProducts());
      view.displayActiveProductsStatus(this);
    });
    okProductsButton.addEventListener("click", function() {
      view.displayProducts(model.getProductsStatus("ok"));
      view.displayActiveProductsStatus(this);
    });
    storageProductsButton.addEventListener("click", function() {
      view.displayProducts(model.getProductsStatus("Storage"));
      view.displayActiveProductsStatus(this);
    });
    outProductsButton.addEventListener("click", function() {
      view.displayProducts(model.getProductsStatus("Out_of_stock"));
      view.displayActiveProductsStatus(this);
    });
    searchStoreButton.addEventListener("click", (event) => {
      that.searchStoreInList(event);
    });
    defaultSearchProductsButton.addEventListener("click", (event) => {
      that.defaultSearchProducts(event);
    });
    defaultSearchStoreButton.addEventListener("click", (event) => {
      that.defaultSearchStore(event);
    });
    delelteStoreButton.addEventListener("click", (event) => {
      that.deleteStore(event);
    });
    addNewProductButton.addEventListener("click", (event) => {
      that.addNewProductToStore(event);
    });
    addNewStoreButton.addEventListener("click", (event) => {
      that.addNewStore(event);
    });
    confirmToCreateStoreButton.addEventListener("click", (event) => {
      that.confirmToCreateStore(event);
    });
    confirmToAddProductButton.addEventListener("click", (event) => {
      that.confirmToAddProduct(event);
    });
    confirmToEditProductButton.addEventListener("click", (event) => {
      that.confirmToEditProduct(event);
    });
    closeCreateStoreFormButton.addEventListener("click", () =>
      that.closeCreateStoreForm()
    );
    closeCreateProductFormButton.addEventListener("click", () =>
      that.closeCreateProductForm()
    );
    closeEditProductFormButton.addEventListener("click", (e) =>
      that.closeEditProductForm(e)
    );
  };
  /**
   * Id of product which user will be want to change
   * @type {number}
   * @private
   */
  let globalEditProductId = null;
  /**
   * Message to write for user if some error are
   * @constant
   * @type {string}
   * @private
   */
  const defaultMessage = "Sorry, something wrong(";

  /**
   * Show error message.
   *
   * @private
   */
  this.showErrorMessage = () => {
    view.errorHandlingMessages("message_details_container", defaultMessage);
  };
  /**
   * Display store list on screen.
   *
   * @private
   */
  this.renderStoresList = () => {
    model
      .getStoresList()
      .then((storesList) => {
        view.displayStoresList(storesList);
        view.displayFirstScreen();
      })
      .catch(() => {
        this.showErrorMessage();
      });
  };

  /**
   * Display info about store on screen.
   *
   * @param {number} storeId the id of model object.
   *
   * @private
   */
  this.renderDetails = (storeId) => {
    model
      .findStoreById(storeId)
      .then((selectedStore) => {
        view.displayHeader(selectedStore);
      })
      .catch(() => {
        this.showErrorMessage();
      });
    model
      .findProductsOfStore(storeId)
      .then((products) => {
        view.displayProducts(products);
        view.displayProductsStatus(
          model.getAllProducts().length,
          model.getProductsStatus("ok").length,
          model.getProductsStatus("Storage").length,
          model.getProductsStatus("Out_of_stock").length
        );
      })
      .catch(() => {
        this.showErrorMessage();
      });
  };
  /**
   * Display table with products on screen.
   *
   * @private
   */
  this.renderTableOfProducts = () => {
    model
      .findProductsOfStore()
      .then((products) => {
        view.displayProducts(products);
        view.displayProductsStatus(
          model.getAllProducts().length,
          model.getProductsStatus("ok").length,
          model.getProductsStatus("Storage").length,
          model.getProductsStatus("Out_of_stock").length
        );
      })
      .catch(() => {
        this.showErrorMessage();
      });
  };

  /**
   * Select store button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  that.selectStoreFromList = (event) => {
    let targetElement = event.target;
    while (targetElement.classList != "main_store_list_info") {
      targetElement = targetElement.parentNode;
    }
    const storeId = targetElement.id;
    view.displayActiveStore(storeId);
    that.renderDetails(storeId);
  };

  /**
   * Edit product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  that.editProductTarget = (event) => {
    let targetElement = event.target.parentNode;
    let editProductId = targetElement.id.substring(
      targetElement.id.indexOf("_") + 1
    );
    if (targetElement.classList.value === "edit_product") {
      that.editProduct(editProductId);
      globalEditProductId = editProductId;
    }
    if (targetElement.classList.value === "delete_product") {
      that.deleteProduct(editProductId);
    }
  };

  /**
   * Connect between model to delete object
   *
   * @param {number} productId product id to delete.
   *
   * @private
   */
  this.deleteProduct = (productId) => {
    if (view.confirmToDelete("Do you realy want to delete product?")) {
      model
        .deleteProductOfStore(productId)
        .then(() => {
          that.renderTableOfProducts();
        })
        .catch(() => {
          alert(defaultMessage);
        });
    }
  };

  /**
   * Search button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.searchStoreInList = (event) => {
    const filter = view.getStoreSearchValue().value;
    model
      .searchStore(filter)
      .then((storesListFilter) => {
        view.displayStoresList(storesListFilter);
      })
      .catch(() => {
        this.showErrorMessage();
      });
    event.preventDefault();
    return false;
  };

  /**
   * Search button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.searchProducts = (event) => {
    const filter = view.getProductSearchValue().value;
    model
      .searchProductsInStore(filter)
      .then((productsFilter) => {
        view.displayProducts(productsFilter);
        view.displayProductsStatus(
          model.getAllProducts().length,
          model.getProductsStatus("ok").length,
          model.getProductsStatus("Storage").length,
          model.getProductsStatus("Out_of_stock").length
        );
      })
      .catch(() => {
        this.showErrorMessage();
      });
    view.displayActiveProductsStatus();
    event.preventDefault();
    return false;
  };

  /**
   * Reset search button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.defaultSearchProducts = (event) => {
    view.getProductSearchValue().value = "";
    that.renderTableOfProducts();
    view.displayActiveProductsStatus();
    event.preventDefault();
    return false;
  };

  /**
   * Reset search button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.defaultSearchStore = (event) => {
    view.getStoreSearchValue().value = "";
    model
      .getStoresList()
      .then((storesList) => {
        view.displayStoresList(storesList);
      })
      .catch(() => {
        this.showErrorMessage();
      });
    event.preventDefault();
    return false;
  };

  /**
   * Open dialog to confirm delete product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.deleteStore = (event) => {
    event.preventDefault();
    if (view.confirmToDelete("Do you realy want to delete this store?")) {
      model
        .deleteStore()
        .then(() => {
          view.displayFirstScreen();
          model
            .getStoresList()
            .then((storesList) => {
              view.displayStoresList(storesList);
            })
            .catch(() => {
              this.showErrorMessage();
            });
        })
        .catch(() => {
          alert(defaultMessage);
        });
    }
  };

  /**
   * Open form to add product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.addNewProductToStore = (event) => {
    event.preventDefault();
    view.openDialogToAddProduct();
  };

  /**
   * Open dialog to add store button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.addNewStore = (event) => {
    event.preventDefault();
    view.openDialogToAddStore();
  };
  /**
   * Connect between model to edit product.
   *
   * @param {number} productId id of choosen product for changes.
   *
   * @private
   */
  this.editProduct = (productId) => {
    model.getProductToEdit(productId).then((product) => {
      view.openDialogToEditProduct(product);
    });
  };

  /**
   * Confirm to add store button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.confirmToCreateStore = (event) => {
    event.preventDefault();
    if (view.validationOfStore()) {
      model.addStore(view.validationOfStore()).then(() => {
        view.closeDialogToAddStore();
        model
          .getStoresList()
          .then((storesList) => {
            view.displayStoresList(storesList);
            view.defaultForm(document.getElementById("form_create_store"));
          })
          .catch(() => {
            this.showErrorMessage();
          });
      });
    }
  };

  /**
   * Confirm to add product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.confirmToAddProduct = (event) => {
    event.preventDefault();
    if (view.validationOfProduct()) {
      model.addProduct(view.validationOfProduct()).then(() => {
        view.closeDialogToAddProduct();
        that.renderTableOfProducts();
        view.defaultForm(document.getElementById("form_create_product"));
      });
    }
  };

  /**
   * Confirm to edit product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.confirmToEditProduct = (event) => {
    event.preventDefault();
    if (view.validationOfProductEdit()) {
      model
        .editProduct(view.validationOfProductEdit(), globalEditProductId)
        .then(() => {
          view.closeDialogToEditProduct();
          that.renderTableOfProducts();
          view.defaultForm(document.getElementById("form_edit_product"));
        });
    }
  };

  /**
   * Close form to add store button click event handler.
   *
   * @private
   */
  this.closeCreateStoreForm = () => {
    view.closeDialogToAddStore();
    view.defaultForm(document.getElementById("form_create_store"));
  };

  /**
   * Close form to add product button click event handler.
   *
   * @private
   */
  this.closeCreateProductForm = () => {
    view.closeDialogToAddProduct();
    view.defaultForm(document.getElementById("form_create_product"));
  };
  /**
   * Close form to edit product button click event handler.
   *
   * @param {Event} event the DOM event object.
   *
   * @private
   */
  this.closeEditProductForm = (e) => {
    e.preventDefault();
    view.closeDialogToEditProduct();
    view.defaultForm(document.getElementById("form_edit_product"));
  };
}

let controller = new Controller(new View(), new Model());
controller.init();
