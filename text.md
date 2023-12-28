* __간단한 페이지를 구성하기 위해서 back-end, front-end, nginx, db를 compose.yaml을 통해 구성해보았다.__
* 아래는 compose.yaml 파일을 작성한 것이다.

services를 가장 먼저 작성하고 그 아래에 각각 작성한다.
front-end를 먼저 작성을 하면,
`app-front`라는 이름으로 Front-end를 구성했는데, node image를 사용하여 front-end를 구성
npm이나 yarn 같은 명령어들은 `app` 폴더에서 동작을 하기 때문에, working_dir을 /app으로 설정해준다.
여기서 나는 `/usr/src/app`으로 설정했다.

`ports`의 경우에는 3000:3000 과 35729:35729로 잡았는데
자세히는 모르지만 일반적으로 Node.js 개발 환경에선 3000 port가 일반적으로 사용된다.
35729 port 경우에는 주로 라이브 리로드 기능을 위해 사용된다. `라이브 리로드`기능이란, 개발자가 소스 코드를 변경할 때, 웹 페이지를 자동으로 새로고침하여 변경 사항을 즉시 반영하는 것이다.

`volume`은 `./app`의 변경 사항이 컨테이너 내부의 `/usr/src/app`에 실시간으로 반영된다고 생각하는 것이 편하다. 나의 개발 환경에서는 /usr/src/app에서 개발 하는 것이 아닌 ./app에서 개발을 하는 거기 때문에 내가 개발하여 적용한 것을 직접 옮기는 것이 아니라 자동으로 옮겨준다는 것이다.

`command`는 yaml 파일이 Docker 컨테이너에서 시작될 때, 자동으로 해당 명령어를 실행해주기 위해 작성하는 부분이다. docker를 실행시키고 나서 환경을 다 맞춘 후에 해당 서비스를 실행하지 않으면 무슨 의미가 있겠는가? 환경 구축 후에 이를 싱핼시켜주기 위해 command에 명령어를 작성해주는 것이다. 나는 yarn package를 사용하기 위해 `yarn start`를 입력했다. 이제 compose 파일이 실행될 때 마다 yarn이 package.json 파일을 보고 이에 맞게 packages를 설치해줄 것이다.

`depends_on`은 yaml파일의 실행 순서를 지정해주는 것이라 생각하면 된다. 아무리 front-end의 코드를 먼저 작성하더라도 `depends_on`이 작성되어있으면 여기에 적혀있는 컨테이너 먼저 실행하고 그 다음에 해당 컨테이너를 실행하라는 의미이다. 하나의 서비스를 만드는데 있어서도 먼저 구축이 되어야하는 것들이 있지 때문에, `depends_on`을 통해 순서를 지정해주는 것이다.

`environment`는 Docker compose 파일에서 해당 컨테이너에서의 환경 변수를 지정해주는 것이다. 음... 쉽게 생각하면 front-end에서 `env.local` 같은 파일에 작성하는 것들이라고 보면 편할거 같은데 여기에는 민감정보를 안쓰는게 맞지 않을까?

`networks`는 컨테이너 간 통신을 할 수 있게 하는 용도이다. 내가 이해한 바로는 각 컨테이너는 기본적으로 격리가 되어있서 통신을 할 수 없는데, `networks`를 통해서 같은 네트워크명을 가진 컨테이너끼리 통신을 할 수 있도록 파이프라인을 만들어 준 것이다. yaml 파일에 많은 컨테이너를 만들어도 결국 같은 네트워크로 연결 해놓지 않으면 통신이 되지 않는다는 의미이다. 그렇기 때문에 `networks`를 통해 연결을 해주는 것이다.

`watch`는 `path`에 있는 파일의 변화가 발생하면 action을 수행하도록 하는 코드이다. `rebuild`를 수행하는 것은 파일의 변화가 발생하면 컨테이너를 재빌드 하는 목적이고 `sync`는 파일이 변화 되었을 때 내부에 해당하는 파일을 자동으로 업데이트 하기위한 목적이다.

```yaml
services:
  # Front-end
  app-front:
    image: node:latest
    working_dir: /usr/src/app
    ports:
      - 3000:3000
      - 35729:35729
    volumes:
      - ./app:/usr/src/app
    command: yarn start
    depends_on:
      - app-db
    environment:
      - NODE_ENV=development
    networks:
      - app-networks
    develop:
      watch:
        - path: /app/package.json
          action: rebuild
        - path: /app
          target: /usr/src/app
          action: sync
```

```yaml
services:
  # Front-end
  app-front:
    image: node:latest
    working_dir: /usr/src/app
    ports:
      - 3000:3000
      - 35729:35729
    volumes:
      - ./app:/usr/src/app
    command: yarn start
    depends_on:
      - app-db
    environment:
      - NODE_ENV=development
    networks:
      - app-networks
    develop:
      watch:
        - path: /app/package.json
          action: rebuild
        - path: /app
          target: /usr/src/app
          action: sync

  # back-end
  app-back:
    image: nginx:alpine
    working_dir: /usr/src/app
    ports:
      - 8080:8080
    volumes:
      - ./backend:/usr/src/app
    depends_on:
      - app-db
    environment:
      - NODE_ENV=development
    networks:
      - app-networks

  # Nginx
  app-nginx:
    image: nginx:alpine
    ports:
      - 80:80
    volumes:
      - ./app/build:/usr/share/nginx/html
    depends_on:
      - app-front
    networks:
      - app-networks
  
  # Database
  app-db:
      image: mongo:latest
      ports:
        - 27017:27017
      networks:
        - app-networks

networks:
  app-networks:
    driver: bridge
```