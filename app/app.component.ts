import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Component({
    selector: 'aipubGitRepos',
    template: `
    <h1>GIT Repos</h1>
    <input #searchValue
      (keyup.enter)="search(searchValue.value)"
      (blur)="search(searchValue.value); searchValue.value='' ">
    <button (click)=search(searchValue.value)>Search</button>
    <table style="width:100%">
    <tr *ngFor="let result of results"><td>{{result.name}}</td><td>{{result.fc}}</td><td>{{result.language}}</td><td>{{result.created_at}}</td></tr>
    </table>
    <table style="width:100%" border="5" borderColor="gray">
    <tr *ngFor="let item of items"><td>{{item.name}}</td><td>{{item.fc}}</td><td>{{item.language}}</td><td>{{item.created_at}}</td></tr>
    </table>
  `
})

export class AppComponent { 
  
  private reposUrl = 'https://api.github.com/users/aipub/repos';
  // private reposUrl = './repos.json'; // for offline tests
  private items: any[];
  private results:any[] =[];
 
  constructor (http: Http) {
  	this.items = [];
  	http.get(this.reposUrl).map((res: Response) => (res.json())).subscribe(s => { 
  		s.sort(function(a:any, b:any) {
		    return parseInt(b.forks_count) - parseInt(a.forks_count);
		});
  		for(var i=0;i<s.length;i++){
	      var obj = s[i];
	      var name = obj.name.replace(/-/g, ' ');
 		    name = name.split(' ')
        	.map(function(word:String) {
        		if (['mongo', 'python'].indexOf(word.toLowerCase()) == -1) {
            		return word[0].toUpperCase() + word.substr(1);
            	} else {
            		return word;
            	}
        	})
        	.join(' ');
  			this.items.push({'name': name, 'fc':obj.forks_count, 'language':obj.language, 'created_at':obj.created_at}); 
	    }
  	});
  }

  search(searchValue:string) {
    for(var i=0;i<this.items.length;i++) {
      if(this.items[i].name.toLowerCase()===searchValue.toLowerCase()) {
        this.results.unshift(this.items[i]);
      //  this.results.unshift(this.items[i].name +" "+ this.items[i].fc +" "+ this.items[i].language +" "+ this.items[i].created_at);      
      }
    }
  }
}
