/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const JDLApplication = require('../../../lib/core/jdl_application');

describe.skip('JDLApplication', () => {
  describe('::new', () => {
    let jdlApplicationConfig = null;

    before(() => {
      const jdlApplication = new JDLApplication({ config: { jhipsterVersion: '4.9.0' } });
      jdlApplicationConfig = jdlApplication.config;
    });

    context('without specifying special options', () => {
      it('uses default values', () => {
        expect(jdlApplicationConfig.languages.has('en') && jdlApplicationConfig.languages.has('fr')).to.be.true;
        expect(jdlApplicationConfig.testFrameworks).not.to.be.undefined;
        delete jdlApplicationConfig.languages;
        delete jdlApplicationConfig.testFrameworks;

        expect(jdlApplicationConfig).to.deep.equal({
          applicationType: 'monolith',
          authenticationType: 'jwt',
          baseName: 'jhipster',
          buildTool: 'maven',
          cacheProvider: 'ehcache',
          clientFramework: 'angularX',
          clientPackageManager: 'npm',
          databaseType: 'sql',
          devDatabaseType: 'h2Disk',
          enableHibernateCache: true,
          enableSwaggerCodegen: false,
          enableTranslation: true,
          jhiPrefix: 'jhi',
          jhipsterVersion: '4.9.0',
          messageBroker: false,
          nativeLanguage: 'en',
          packageFolder: 'com/mycompany/myapp',
          packageName: 'com.mycompany.myapp',
          prodDatabaseType: 'mysql',
          searchEngine: false,
          serverPort: '8080',
          serviceDiscoveryType: false,
          skipClient: false,
          skipServer: false,
          skipUserManagement: false,
          useSass: false,
          websocket: false
        });
      });
    });
  });
  describe('#forEachEntityName', () => {
    let application = null;

    before(() => {
      application = new JDLApplication({ entities: ['A', 'B'] });
    });

    context('when not passing a function', () => {
      it('does not fail', () => {
        application.forEachEntityName();
      });
    });
    context('when passing a function', () => {
      const result = [];

      before(() => {
        application.forEachEntityName(entityName => {
          result.push(entityName);
        });
      });

      it('uses each entity name', () => {
        expect(result).to.deep.equal(['A', 'B']);
      });
    });
  });
  describe('#toString', () => {
    context('when there is no entity', () => {
      let jdlApplication = null;

      before(() => {
        jdlApplication = new JDLApplication({ config: { jhipsterVersion: '4.9.0', path: '../../' } });
      });

      it('stringifies the application object', () => {
        expect(jdlApplication.toString()).to.eq(`application {
  config {
    applicationType monolith
    clientPackageManager npm
    databaseType sql
    devDatabaseType h2Disk
    enableHibernateCache true
    enableSwaggerCodegen false
    enableTranslation true
    jhiPrefix jhi
    languages en,fr
    messageBroker false
    nativeLanguage en
    packageName com.mycompany.myapp
    packageFolder com/mycompany/myapp
    prodDatabaseType mysql
    searchEngine false
    serviceDiscoveryType false
    skipClient false
    skipServer false
    testFrameworks
    useSass false
    websocket false
    jhipsterVersion 4.9.0
    path ../../
    authenticationType jwt
    baseName jhipster
    buildTool maven
    cacheProvider ehcache
    clientFramework angularX
    serverPort 8080
    skipUserManagement false
  }
}`);
      });
    });
    context('when there are listed entities', () => {
      let jdlApplication = null;

      before(() => {
        jdlApplication = new JDLApplication({ entities: ['A', 'B', 'C', 'C'] });
      });

      it('exports the entity names', () => {
        expect(jdlApplication.toString().includes('entities A, B, C')).to.be.true;
      });
    });
  });
  describe('::isValid', () => {
    context('when checking the validity of an invalid object', () => {
      context('because it is nil', () => {
        it('returns false', () => {
          expect(JDLApplication.isValid()).to.be.false;
        });
      });
      context('when not having a config attribute', () => {
        it('returns false', () => {
          expect(JDLApplication.isValid({})).to.be.false;
        });
      });
      context('when having translations', () => {
        context('and no native language', () => {
          let jdlApplication = null;

          before(() => {
            jdlApplication = new JDLApplication({});
            delete jdlApplication.config.nativeLanguage;
          });

          it('returns false', () => {
            expect(JDLApplication.isValid(jdlApplication)).to.be.false;
          });
        });
      });
    });
  });
});
