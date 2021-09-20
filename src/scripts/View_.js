/**
 * View class. Knows everything about dom & manipulation and a little bit about data structure, which should be
 * filled into UI element.
 *
 * @constructor
 */
function View() {
  /**
   * DOM elements of containers and templates of page.
   * @type {string}
   */
  let storesListView = document.getElementById("store_list_container");
  let detailsHeaderView = document.getElementById(
    "store_details_header_container"
  );
  let detailsStatusView = document.getElementById(
    "store_details_status_container"
  );
  let detailsProductsView = document.getElementById(
    "store_details_products_container"
  );
  let productsTable = document.querySelector(".main_store_product");
  let editButtonsContainer = document.querySelector(".footer_store_product");
  let messageErrorDetailsContainer = document.getElementById(
    "message_details_container"
  );
  let storeInListTpl = document.getElementById("store_tpl");
  let productInfoTpl = document.getElementById("products_table_tpl");
  let storeDetailsTpl = document.getElementById("details_store_tpl");

  let allProductsCount = document.getElementById("all_count");
  let okStatusProductsCount = document.getElementById("count_ok_products");
  let storageStatusProductsCount = document.getElementById(
    "count_storage_products"
  );
  let outStatusProductsCount = document.getElementById("count_out_products");
  let formToAddProduct = document.getElementById("openDialogCreateProduct");
  let formToAddStore = document.getElementById("openDialogCreateStore");
  let formToEditProduct = document.getElementById("openDialogEditProduct");

  /**
   * Buttons DOM elements.
   * @constant
   * @type {string}
   */
  const searchStoreButton = document.getElementById("searchStoreInStoreList");
  const defaultSearchStoreButton = document.getElementById(
    "searchStoreInStoreListDefault"
  );
  const searchProductsButton = document.getElementById("searchProductsInStore");
  const defaultSearchProductsButton = document.getElementById(
    "defaultSearchProductsInStore"
  );
  const allCountOfProductsButton = document.getElementById("all_count_click");
  const okStatusProductsButton = document.getElementById("ok_status");
  const storageStatusProductsButton = document.getElementById("storage_status");
  const outStatusProductsButton = document.getElementById(
    "out_of_stock_status"
  );
  const deleteSelectedStoreButton = document.getElementById(
    "deleteSelectedStore"
  );
  const inputOfStoreSearch = document.getElementById("search_store_list");
  const inputOfProductsSearch = document.getElementById(
    "search_products_in_store"
  );
  const addNewProductButton = document.getElementById("addNewProduct");
  const addNewStoreButton = document.getElementById("openDialogAddStore");

  /**
   * Returns button.
   *
   * @returns {string} DOM element.
   *
   * @public
   */
  this.getSearchStoreButton = () => {
    return searchStoreButton;
  };
  /**
   * Returns button.
   *
   * @returns {string} DOM element.
   *
   * @public
   */
  this.getDefaultSearchStoreButton = () => {
    return defaultSearchStoreButton;
  };
  this.getSearchProductsButton = () => {
    return searchProductsButton;
  };
  this.getDefaultSearchProductsButton = () => {
    return defaultSearchProductsButton;
  };
  this.getProductsListContainer = () => {
    return detailsProductsView;
  };
  this.getOkStatusProductsButton = () => {
    return okStatusProductsButton;
  };
  this.getStorageStatusProductsButton = () => {
    return storageStatusProductsButton;
  };
  this.getOutStatusProductsButton = () => {
    return outStatusProductsButton;
  };
  this.getAddNewProductButton = () => {
    return addNewProductButton;
  };
  this.getAddNewStoreButton = () => {
    return addNewStoreButton;
  };
  this.getSortNameButton = () => {
    return document.getElementById("sort_name");
  };
  this.getSortPriceButton = () => {
    return document.getElementById("sort_price");
  };
  this.getSortSpacesButton = () => {
    return document.getElementById("sort_spaces");
  };
  this.getSortInfoButton = () => {
    return document.getElementById("sort_supplierInfo");
  };
  this.getSortCountryButton = () => {
    return document.getElementById("sort_country");
  };
  this.getSortCompanyButton = () => {
    return document.getElementById("sort_company");
  };
  this.getSortRaitingButton = () => {
    return document.getElementById("sort_raiting");
  };
  this.getConfirmToCreateStoreButton = () => {
    return document.getElementById("confirmToCreateStore");
  };
  this.getConfirmToAddProductButton = () => {
    return document.getElementById("confirmToAddProduct");
  };
  this.getStoresListContainer = () => {
    return storesListView;
  };
  this.getAllCountOfProductsButton = () => {
    return allCountOfProductsButton;
  };
  this.getDeleteSelectedStoreButton = () => {
    return deleteSelectedStoreButton;
  };
  /**
   * Returns value of input.
   *
   * @returns {string} filter search of stores.
   *
   * @public
   */
  this.getStoreSearchValue = () => {
    return inputOfStoreSearch.search;
  };
  /**
   * Returns value of input.
   *
   * @returns {string} filter search of products.
   *
   * @public
   */
  this.getProductSearchValue = () => {
    return inputOfProductsSearch.search;
  };
  this.getConfirmEditProduct = () => {
    return document.getElementById("confirmToEditProduct");
  };
  this.getCloseCreateStoreForm = () => {
    return document.getElementById("close_dialog_create_store");
  };
  this.getCloseCreateProductForm = () => {
    return document.getElementById("close_dialog_create_product");
  };
  this.getCloseEditProductForm = () => {
    return document.getElementById("close_dialog_edit_product");
  };
  this.displayFirstClickOnStoreList = () => {
    productsTable.style.display = "block";
    editButtonsContainer.style.display = "block";
    detailsHeaderView.style.display = "block";
    messageErrorDetailsContainer.style.display = "none";
  };

  this.displayFirstScreen = () => {
    productsTable.style.display = "none";
    editButtonsContainer.style.display = "none";
    detailsHeaderView.style.display = "none";
    detailsStatusView.style.display = "none";
    this.errorHandlingMessages(
      "message_details_container",
      "Choose store from the list"
    );
  };

  this.displayStoresList = function(storeList) {
    storesListView.innerHTML = "";
    const fragment = new DocumentFragment();
    for (let i = 0; i < storeList.length; i++) {
      const el = storeInListTpl.content.cloneNode(true);
      el.querySelector(".main_store_list_info").setAttribute(
        "id",
        storeList[i].id
      );
      el.querySelector(".info_title_shop").textContent =
        storeList[i].Name.length > 15
          ? storeList[i].Name.slice(0, 15) + "..."
          : storeList[i].Name;
      el.querySelector(".js-square").textContent = storeList[i].FloorArea;
      el.querySelector(".info_text").textContent = storeList[i].Address;
      fragment.appendChild(el);
    }
    storesListView.appendChild(fragment);
    if (!storeList.length) {
      this.errorHandlingMessages("message_stores_container", "No such stores");
    } else {
      this.errorHandlingMessages("message_stores_container", "");
    }
    return this;
  };

  this.displayActiveStore = (storeId) => {
    if (document.querySelector(".active_store")) {
      document.querySelector(".active_store").classList.remove("active_store");
    }
    document.getElementById(storeId).classList.add("active_store");
    return this;
  };

  this.displayHeader = function(store) {
    detailsHeaderView.innerHTML = "";
    const fragment = new DocumentFragment();
    const el = storeDetailsTpl.content.cloneNode(true);
    el.querySelector(".store_mail").textContent = store.Email;
    el.querySelector(".store_phone").textContent = store.PhoneNumber;
    el.querySelector(".store_address").textContent = store.Address;
    el.querySelector(".store_date").textContent = new Date(
      store.Established
    ).toLocaleDateString();
    el.querySelector(".store_area").textContent = store.FloorArea;
    fragment.appendChild(el);
    detailsHeaderView.appendChild(fragment);
    return this;
  };

  this.displayProductsStatus = function(
    all_count,
    ok_count,
    storage_count,
    out_count
  ) {
    detailsStatusView.style.display = "flex";
    allProductsCount.textContent = all_count;
    okStatusProductsCount.textContent = ok_count;
    storageStatusProductsCount.textContent = storage_count;
    outStatusProductsCount.textContent = out_count;
    return this;
  };

  this.displayActiveProductsStatus = function(
    DOMelement = allCountOfProductsButton
  ) {
    if (document.querySelector(".active_status_products")) {
      document
        .querySelector(".active_status_products")
        .classList.remove("active_status_products");
    }
    DOMelement.classList.add("active_status_products");
    return this;
  };

  this.displayProducts = function(rel_Products) {
    const fragment = new DocumentFragment();
    for (let i = 0; i < rel_Products.length; i++) {
      const el = productInfoTpl.content.cloneNode(true);
      el.querySelector(".js_product_name").textContent = rel_Products[i].Name;
      el.querySelector(".js_product_price").textContent = rel_Products[i].Price;
      el.querySelector(".js_product_spaces").textContent =
        rel_Products[i].Specs.length > 20
          ? rel_Products[i].Specs.slice(0, 20) + "..."
          : rel_Products[i].Specs;
      el.querySelector(".js_product_info").textContent =
        rel_Products[i].SupplierInfo.length > 20
          ? rel_Products[i].SupplierInfo.slice(0, 20) + "..."
          : rel_Products[i].SupplierInfo;
      el.querySelector(".js_product_country").textContent =
        rel_Products[i].MadeIn;
      el.querySelector(".js_product_company").textContent =
        rel_Products[i].ProductionCompanyName;
      el.querySelector(".rating_mobile").textContent = rel_Products[i].Rating;
      let starsImg = "";
      let countImg = +rel_Products[i].Rating;
      for (let i = 0; i < countImg; i++) {
        starsImg += `<img class="rating_icon" src="img/yellowstar.png" alt="star" />`;
      }
      el.querySelector(".rating_desktop").innerHTML = "";
      el.querySelector(".rating_desktop").innerHTML = starsImg;
      el.querySelector(".edit_product").setAttribute(
        "id",
        `edit_${rel_Products[i].id}`
      );
      el.querySelector(".delete_product").setAttribute(
        "id",
        `delete_${rel_Products[i].id}`
      );
      fragment.appendChild(el);
    }
    detailsProductsView.innerHTML = `<tr class="table_header_none">
              <th class="table_Name">Name</th>
              <th class="table_price">Price</th>
              <th class="table_spaces">Spaces</th>
              <th class="table_info">SupplierInfo</th>
              <th class="table_country">Country of origin</th>
              <th class="table_company">Prod.company</th>
              <th class="table_rating">Rating</th>
              <th class="table_buttons_edit_product"></th>
            </tr>`;
    detailsProductsView.appendChild(fragment);
    this.displayFirstClickOnStoreList();
    return this;
  };

  this.errorHandlingMessages = function(errorContainerId, errorMessage) {
    let errorContainer = document.getElementById(errorContainerId);
    errorContainer.innerHTML = errorMessage;
    if (errorMessage) {
      errorContainer.style.display = "block";
    } else {
      errorContainer.style.display = "none";
    }
    return this;
  };

  this.defaultForm = function(form) {
    let elements = form.querySelectorAll("input");
    elements.forEach((element) => {
      element.value = "";
    });
    if (form.querySelectorAll(".validation-error")) {
      let errorElements = form.querySelectorAll(".validation-error");
      errorElements.forEach((el) => {
        el.classList.remove("validation-error");
      });
    }
    return this;
  };

  this.confirmToDelete = (messageText) => {
    return confirm(messageText);
  };

  this.openDialogToAddProduct = () => {
    formToAddProduct.classList.add("modalDialog_target");
  };

  this.closeDialogToAddProduct = () => {
    formToAddProduct.classList.remove("modalDialog_target");
  };

  this.openDialogToAddStore = () => {
    formToAddStore.classList.add("modalDialog_target");
  };

  this.openDialogToEditProduct = (product) => {
    formToEditProduct.classList.add("modalDialog_target");
    let inputs = formToEditProduct.querySelectorAll("input");
    inputs[0].value = product.Name;
    inputs[1].value = product.Price;
    inputs[2].value = product.Specs;
    inputs[3].value = product.Rating;
    inputs[4].value = product.SupplierInfo;
    inputs[5].value = product.MadeIn;
    inputs[6].value = product.ProductionCompanyName;
  };
  this.closeDialogToEditProduct = () => {
    formToEditProduct.classList.remove("modalDialog_target");
  };

  this.closeDialogToAddStore = () => {
    formToAddStore.classList.remove("modalDialog_target");
  };

  this.validationOfStore = () => {
    let inputWrapper = formToAddStore.querySelectorAll(".input_wrapper");
    let elements = formToAddStore.querySelectorAll("input");
    let index = 0;
    try {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
          index = i;
          throw "the value is empty";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
        if (!elements[1].value.includes("@")) {
          index = 1;
          throw "not e-mail";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }

        if (elements[5].value < 0) {
          index = 5;
          throw "area > 0";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
      }
      inputWrapper[index].dataset.validationMessage = "";
      inputWrapper[index].classList.remove("validation-error");
      let res = [];
      for (let i = 0; i < elements.length; i++) {
        res.push(elements[i].value);
      }
      return res;
    } catch (err) {
      inputWrapper[index].dataset.validationMessage = err;
      inputWrapper[index].classList.add("validation-error");
      return false;
    }
  };

  this.validationOfProduct = () => {
    let inputWrapper = formToAddProduct.querySelectorAll(".input_wrapper");
    let elements = formToAddProduct.querySelectorAll("input");
    let select = document.getElementById("setProductStatusForm").value;
    let index = 0;
    try {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
          index = i;
          throw "the value is empty";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
        if (elements[1].value < 0) {
          index = 1;
          throw "prise > 0";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }

        if (elements[3].value < 0 || elements[3].value > 5) {
          index = 3;
          throw "enter value 1..5";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
      }
      inputWrapper[index].dataset.validationMessage = "";
      inputWrapper[index].classList.remove("validation-error");
      let res = [];
      for (let i = 0; i < elements.length; i++) {
        res.push(elements[i].value);
      }
      switch (select) {
        case "1":
          res.push("OK");
          break;
        case "2":
          res.push("STORAGE");
          break;
        case "3":
          res.push("OUT_OF_STOCK");
          break;
      }
      return res;
    } catch (err) {
      inputWrapper[index].dataset.validationMessage = err;
      inputWrapper[index].classList.add("validation-error");
      return false;
    }
  };
  this.validationOfProductEdit = () => {
    let inputWrapper = formToEditProduct.querySelectorAll(".input_wrapper");
    let elements = formToEditProduct.querySelectorAll("input");
    let select = document.getElementById("setProductStatusForm").value;
    let index = 0;
    try {
      for (let i = 0; i < elements.length; i++) {
        if ([i].value == "") {
          index = i;
          throw "the value is empty";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
        if (elements[1].value < 0) {
          index = 1;
          throw "prise > 0";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }

        if (elements[3].value < 0 || elements[3].value > 5) {
          index = 3;
          throw "enter value 1..5";
        } else {
          inputWrapper[i].dataset.validationMessage = "";
          inputWrapper[i].classList.remove("validation-error");
        }
      }
      inputWrapper[index].dataset.validationMessage = "";
      inputWrapper[index].classList.remove("validation-error");
      let res = [];
      for (let i = 0; i < elements.length; i++) {
        res.push(elements[i].value);
      }
      switch (select) {
        case "1":
          res.push("OK");
          break;
        case "2":
          res.push("STORAGE");
          break;
        case "3":
          res.push("OUT_OF_STOCK");
          break;
      }
      return res;
    } catch (err) {
      inputWrapper[index].dataset.validationMessage = err;
      inputWrapper[index].classList.add("validation-error");
      return false;
    }
  };
}
