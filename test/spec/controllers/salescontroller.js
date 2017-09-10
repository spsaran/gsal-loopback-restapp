
describe('Controller: SalesController', function () {

  // load the controller's module
  beforeEach(module('egarsalApp'));

  var SalesController,
    scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, saleFactory) {
          // place here mocked dependencies
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET("http://localhost:3000/items").respond([
        {
      "id": 0,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      },
      {
      "id": 1,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      }
      ]);

    scope = $rootScope.$new();
    SalesController = $controller('SalesController', {
      $scope: scope, saleFactory: saleFactory
    });


  }));

  it('should have showDetails as false', function () {
    expect(scope.showDetails).toBe(false);
  });
  it('should create "items" with 2 items fetched from xhr', function() {
      // expect(scope.items.length).toBe(0);
      $httpBackend.flush();
      expect(scope.items.length).toBe(2);
      expect(scope.items[0].name).toBe("Uthapizza");
      expect(scope.items[1].label).toBe("Hot");

  });

});
