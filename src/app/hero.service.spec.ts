import { inject, tick, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { concatMap, tap, map } from 'rxjs/operators';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';
  describe('In memory web api testing', () => {

    let heroService: HeroService;

    beforeEach(function() {
      TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
 
        providers: [HeroService,MessageService],
        declarations: []
      })
    });

     
    it('can get users', async(() => {
      const heroService = getTestBed().get(HeroService);
      heroService.getHeroes()
        .subscribe(
        heroes => {
          expect(heroes.length).toBeGreaterThan(20, 'should have heroes');
        },
       // failure
        );
    }));

    it('can get users by id=1', async(() => {
      const heroService = getTestBed().get(HeroService);
      heroService.getHero(10)
        .subscribe(
        hero => {
          // console.log(hero);
          expect(hero.name).toBe('Windstorm');
        },
        () => fail('getHero failed')
        );
    }));

    it('should 404 when user id not found', async(() => {
      const heroService = getTestBed().get(HeroService);
      const id = 123456;
      heroService.getHero(id)
        .subscribe(
        () => fail(`should not have found hero for id='${id}'`),
        err => {
          expect(err.status).toBe(404, 'should have 404 status');
        }
        );
    }));

    // it('can add a hero', async(() => {
    //   heroService.addHero('FunkyBob').pipe(
    //     tap(hero => {
    //       // console.log(hero);
    //       expect(hero.name).toBe('FunkyBob');
    //     }),
    //     // Get the new hero by its generated id
    //     concatMap(hero => heroService.getHero(hero.id)),
    //   ).subscribe(
    //     hero => {
    //       expect(hero.name).toBe('FunkyBob');
    //     },
    //    // err => failure('re-fetch of new hero failed')
    //     );
    // }), 10000);

    it('can delete a user', async(() => {
      const heroService = getTestBed().get(HeroService);
      const id = 10;
      heroService.deleteHero(id)
        .subscribe(
        (_: {}) => {
          expect(_).toBeDefined();
        },
       // failure
        );
    }));

    it('should allow delete of non-existent user', async(() => {
      const heroService = getTestBed().get(HeroService);
      const id = 123456;
      heroService.deleteHero(id)
        .subscribe(
        (_: {}) => {
          expect(_).toBeDefined();
        },
      //  failure
        );
    }));

    it('can search for users by name containing "a"', async(() => {
      const heroService = getTestBed().get(HeroService);
      heroService.searchHeroes('a')
        .subscribe(
        (heroes: Hero[]) => {
          expect(heroes.length).toBe(3, 'should find 3 heroes with letter "a"');
        },
        //failure
      );
    }));

    it('can update existing user', async(() => {
      const heroService = getTestBed().get(HeroService);
      const id = 11;
      heroService.getHero(id).pipe(
        concatMap(hero => {
         // hero.name = 'Narco';
          return heroService.updateHero(hero);
        }),
        concatMap(() => {
          return heroService.getHero(id);
        })
      ).subscribe(
        hero => {
          console.log(hero);
          expect(hero.name).toBe('Narco');
        },
        err => fail('re-fetch of updated hero failed')
        );
    }), 10000);



 
 

     
});
