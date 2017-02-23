This repository is dedicated for CloudHacks hackathon website. Website uses Jekyll framework to generate static site.

# How to use
* Install Jekyll. For more details, read [Jekyll documentation](http://jekyllrb.com/docs/installation/)
* Serve the website with `jekyll serve`
* Access the served website in localhost port 4000. localhost:4000

# Running in a docker container

```
docker build . -t cloudhacks-jekyll

# run container and only expose on your pc
docker run -p "0.0.0.0:4000:4000" cloudhacks-jekyll:latest
```
