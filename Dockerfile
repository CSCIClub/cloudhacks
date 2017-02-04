FROM alpine:latest
RUN apk add --no-cache \
      zlib-dev build-base libxml2-dev libxslt-dev readline-dev zlib-dev \
      libxslt-dev readline-dev libxml2-dev libffi-dev ruby-dev yaml-dev zlib \
      libxml2 build-base ruby-io-console readline libxslt ruby yaml libffi \
      nodejs ruby-irb ruby-json ruby-rake ruby-rdoc

RUN gem install --no-ri --no-rdoc jekyll bundler
COPY . /static
WORKDIR /static
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
