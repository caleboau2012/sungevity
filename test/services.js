var assert = require("assert");
var services = require("../services");

describe("Top 10", function() {
  describe("Given an empty array", function() {
    before(function() {
      this.array = [];
    });
    it("should return an empty word list", function() {
      assert.equal(0, services.top10(this.array).length);
    });
  });

  describe("Given an array with only one entry", function() {
    before(function() {
      this.array = ["The actual count of the word 'the' used here is two"];
    });
    it("should return the right word count of 3", function() {
      assert.equal("the", services.top10(this.array)[0].word);
      assert.equal(3, services.top10(this.array)[0].count);
    });
  });

  describe("Given a regular array of words", function() {
    before(function() {
      this.array = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      ];
      this.result = services.top10(this.array);
    });
    it("should return a non empty array", function() {
      assert.equal(true, Array.isArray(this.result));
    });
    it("should return a count of four for lorem ipsum", function() {
      assert.equal("lorem", this.result[1].word);
      assert.equal(4, this.result[1].count);
    });
  });
});

// TODO
// Add more unit tests for services
