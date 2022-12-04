function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

class Province {
  constructor(doc) {
    this.name = doc.name;
    this.producers = [];
    this.totalProduction = 0;
    this.demand = doc.demand;
    this.price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(tyhis, d)));
  }

  addProducer(arg) {
    this.producers.push(arg);
    this.totalProduction += arg.production;
  }

  get shortfall() {
    return this.demand - this.totalProduction;
  }

  get name() {
    return this.name;
  }
  get producers() {
    return this.producers;
  }
  get totalProduction() {
    return this.totalProduction;
  }
  set totalProduction(arg) {
    return (this.totalProduction = arg);
  }
  get demand() {
    return this.demand;
  }
  set demand(arg) {
    this.demand = parseInt(arg);
  } // 숫자로 파싱해서 저장
  get price() {
    return this.price;
  }
  set price(arg) {
    this.price = parseInt(arg);
  } // 숫자로 파싱해서 저장
}

class Producer {
  constructor(aProvince, data) {
    this.province = aProvince;
    this.cost = data.cost;
    this.name = data.name;
    this.production = data.production || 0;
  }

  get name() {
    return this.name;
  }
  get cost() {
    return this.cost;
  }
  set cost(arg) {
    this.cost = parseInt(arg);
  }

  get production() {
    return this.production;
  }
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this.province.totalProduction += newProduction - this.production;
    this.production = newProduction;
  }
}

describe("no producers", function () {
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });
  it("shortfall", function () {
    expect(noProducers.shortfall).equal(30);
  });
  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});

describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Provincee(sampleProvinceData());
  });
  it("shortfall", function () {
    expect(asia.shortfall).equal(5);
  });
  it("profit", function () {
    expect(asia.profit).equal(230);
  });
  it("zero demand", function () {
    // 수요가 없다.
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
  it("negative demand", function () {
    // 수요가 음수다.
    asia.demand = 0;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
});

describe("string for producers", function () {
  it("", function () {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
