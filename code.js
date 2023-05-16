//date
var totalincome = 0;
var totalinexpenses = 0;
var totalbudage = 0;
var incomeId = 0;
var listincom = [];
var expensesId = 0;
var listexpenses = [];

// to make current month
var data = new Date();
const month = data.toLocaleString("default", { month: "long" });
document.querySelector(".budget__title--month").textContent = month;

//change percentage
var percentage = document.querySelector(".budget__expenses--percentage");

//get value from user
var addvalued = document.querySelector(".add__value");
var decription = document.querySelector(".add__description");
var x = document.querySelector(".add__type");

function plusvalue() {
  totalincome += +addvalued.value;
  document.querySelector(".budget__income--value").textContent = totalincome;
  var q =
    '<div class="item clearfix" id="income-' +
    incomeId +
    '"><div class="item__description">' +
    decription.value +
    '</div><div class="right clearfix"><div class="item__value">+ ' +
    addvalued.value +
    '</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  document.querySelector(".income__list").insertAdjacentHTML("beforeend", q);
  var input_income = {
    no: incomeId,
    decri: decription.value,
    val: addvalued.value,
  };
  listincom.push(input_income);
  addvalued.value = null;
  decription.value = null;
  incomeId++;
  totalbudage = totalincome + totalinexpenses;
  document.querySelector(".budget__value").textContent = totalbudage;
}
function negativevalue() {
  totalinexpenses -= +addvalued.value;
  document.querySelector(".budget__expenses--value").textContent =
    totalinexpenses;
  var expensespercentage = ((addvalued.value / totalincome) * 100).toFixed(1);
  var z =
    '<div class="item clearfix" id="expense-' +
    expensesId +
    '"><div class="item__description">' +
    decription.value +
    '</div><div class="right clearfix"><div class="item__value">- ' +
    addvalued.value +
    '</div><div class="item__percentage">' +
    expensespercentage +
    '%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  document.querySelector(".expenses__list").insertAdjacentHTML("beforeend", z);
  var input_expenses = {
    no: expensesId,
    decri: decription.value,
    val: addvalued.value,
  };
  listexpenses.push(input_expenses);
  addvalued.value = null;
  decription.value = null;
  expensesId++;
  totalbudage = totalincome + totalinexpenses;
  document.querySelector(".budget__value").textContent = totalbudage;
  percentage.textContent =
    ((totalinexpenses / totalincome) * 100).toFixed(1) + "%";
}

function addbtm() {
  if (addvalued.value > 0 && decription.value !== null) {
    if (x.value === "inc") {
      plusvalue();
    } else {
      negativevalue();
    }
  }
}

var buttom = document.querySelector(".add__btn");
buttom.addEventListener("click", addbtm);

// funcation to make enter to add value
function handleclickboardpress(e) {
  if (e.key === "Enter") {
    addbtm();
  }
}
document.addEventListener("keypress", handleclickboardpress);

//delete
btm_delete = document.querySelector("body");
btm_delete.addEventListener("click", removeElment);

// 3l4an a3mel ay remove laze index w splice
function removeElment(e) {
  if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList.value === "income__list"
  ) {
    // console.log("hiiiiii");
    var AllofElement =
      e.target.parentElement.parentElement.parentElement.parentElement;
    var id = AllofElement.id.split("-")[1];
    var index = listincom.findIndex(function e() {
      return e.no === +id;
    });
    console.log(index);
    listincom.splice(index, 1);
    AllofElement.remove();
    // to make totalincom =zero to calculate new totalincom
    totalincome = 0;
    //updata data in ui
    for (let j = 0; j < listincom.length; j++) {
      totalincome += +listincom[j].val;
    }
    document.querySelector(".budget__income--value").textContent =
      totalincome.toLocaleString();
    totalbudage = totalincome - totalinexpenses;
    document.querySelector(".budget__value").textContent =
      totalbudage.toLocaleString();
  } else if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList.value === "expenses__list"
  ) {
    // console.log("hiiiiii");
    var contentofelement =
      e.target.parentElement.parentElement.parentElement.parentElement;
    var iD = contentofelement.id.split("-")[1];
    var index_2 = listexpenses.findIndex(function w() {
      return w.no === +iD;
    });
    console.log(index_2);
    listexpenses.splice(index_2, 1);
    contentofelement.remove();
    totalinexpenses = 0;
    for (let i = 0; i < listexpenses.length; i++) {
      totalinexpenses += +listexpenses.val;
    }
    document.querySelector(".budget__expenses--value").textContent =
      totalincome.toLocaleString();
    totalbudage = totalincome - totalinexpenses;
    document.querySelector(".budget__value").textContent =
      totalbudage.toLocaleString();
  }
}

// funcation to make app zero
function start() {
  document.querySelector(".budget__value").textContent = "0";
  document.querySelector(".budget__income--value").textContent = "0";
  document.querySelector(".budget__expenses--value").textContent = "0";
  document.querySelector(".budget__expenses--percentage").textConten = "0";
  percentage.textContent = "0";
}
start();
