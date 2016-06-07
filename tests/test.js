var path = require("path");
var assert = require("chai").assert;

var configurator = require("../index");

describe("Create config", function () {

    it("Should work without params", function () {
        configurator();
    });

    it("Should get environment and common by default", function () {
        var config = configurator({basePath: path.join(__dirname, "environment")});
        assert.deepEqual(
            config,
            {
                app: {
                    data1: 1,
                    data2: 42,
                    data3: { a: 3, b: 4}
                }
            }
        );
        var commonApp = require(path.join(__dirname, "environment", "common", "app"));
        commonApp.data2 = 2;
    });

    it("Should get environment and common by default", function () {
        var config = configurator({basePath: path.join(__dirname, "environment"), environment: "abscent"});
        assert.deepEqual(
            config,
            {
                app: {
                    data1: 1,
                    data2: 2,
                    data3: { a: 3, b: 4}
                }
            }
        );
    });

    it("Should get environment from params", function () {
        var config = configurator({basePath: path.join(__dirname, "environment"), environment: "another"});
        assert.deepEqual(
            config,
            {
                another: {
                    data: 1
                },
                app: {
                    data1: 1,
                    data2: 2,
                    data3: { a: 5, b: 4}
                }
            }
        );
        var commonApp = require(path.join(__dirname, "environment", "common", "app"));
        commonApp.data3 = { a: 3, b: 4};
    });

    it("Should allow to change common config", function () {
        var config = configurator({basePath: path.join(__dirname, "environment"), common: "another"});
        assert.deepEqual(
            config,
            {
                another: {
                    data: 1
                },
                app: {
                    data2: 42,
                    data3: { a: 5}
                }
            }
        );
        var commonApp = require(path.join(__dirname, "environment", "another", "app"));
        delete commonApp.data2;
    });

    it("Should allow to turn off common config", function () {
        var config = configurator({basePath: path.join(__dirname, "environment"), common: false});
        assert.deepEqual(
            config,
            {
                app: {
                    data2: 42
                }
            }
        );
    });
});