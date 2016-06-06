"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.reposUrl = 'https://api.github.com/users/aipub/repos';
        this.results = [];
        this.items = [];
        http.get(this.reposUrl).map(function (res) { return (res.json()); }).subscribe(function (s) {
            s.sort(function (a, b) {
                return parseInt(b.forks_count) - parseInt(a.forks_count);
            });
            for (var i = 0; i < s.length; i++) {
                var obj = s[i];
                var name = obj.name.replace(/-/g, ' ');
                name = name.split(' ')
                    .map(function (word) {
                    if (['mongo', 'python'].indexOf(word.toLowerCase()) == -1) {
                        return word[0].toUpperCase() + word.substr(1);
                    }
                    else {
                        return word;
                    }
                })
                    .join(' ');
                _this.items.push({ 'name': name, 'fc': obj.forks_count, 'language': obj.language, 'created_at': obj.created_at });
            }
        });
    }
    AppComponent.prototype.search = function (searchValue) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name.toLowerCase() === searchValue.toLowerCase()) {
                this.results.unshift(this.items[i]);
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'aipubGitRepos',
            template: "\n    <h1>GIT Repos</h1>\n    <input #searchValue\n      (keyup.enter)=\"search(searchValue.value)\"\n      (blur)=\"search(searchValue.value); searchValue.value='' \">\n    <button (click)=search(searchValue.value)>Search</button>\n    <table style=\"width:100%\">\n    <tr *ngFor=\"let result of results\"><td>{{result.name}}</td><td>{{result.fc}}</td><td>{{result.language}}</td><td>{{result.created_at}}</td></tr>\n    </table>\n    <table style=\"width:100%\" border=\"5\" borderColor=\"gray\">\n    <tr *ngFor=\"let item of items\"><td>{{item.name}}</td><td>{{item.fc}}</td><td>{{item.language}}</td><td>{{item.created_at}}</td></tr>\n    </table>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map