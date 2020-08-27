var yall = (function () {
  'use strict';

  function yall (options) {
    options = options || {}; // Options

    var lazyClass = options.lazyClass || "lazy";
    var lazyBackgroundClass = options.lazyBackgroundClass || "lazy-bg";
    var idleLoadTimeout = "idleLoadTimeout" in options ? options.idleLoadTimeout : 200;
    var observeChanges = options.observeChanges || false;
    var events = options.events || {}; // Shorthands (saves more than a few bytes!)

    var win = window;
    var ric = "requestIdleCallback";
    var io = "IntersectionObserver"; // App stuff

    var dataAttrs = ["srcset", "src", "poster"];
    var arr = [];

    var queryDOM = function queryDOM(selector, root) {
      return arr.slice.call((root || document).querySelectorAll(selector || "img." + lazyClass + ",video." + lazyClass + ",iframe." + lazyClass + ",." + lazyBackgroundClass));
    }; // This function handles lazy loading of elements.


    var yallLoad = function yallLoad(element) {
      var parentNode = element.parentNode;
      var elements = [];
      var sourceNode;

      if (parentNode.nodeName == "PICTURE") {
        sourceNode = parentNode;
      }

      if (element.nodeName == "VIDEO") {
        sourceNode = element;
      }

      elements = queryDOM("source", sourceNode);

      for (var elementIndex in elements) {
        yallFlipDataAttrs(elements[elementIndex]);
      }

      yallFlipDataAttrs(element);

      if (element.autoplay) {
        setTimeout(function () {
          element.load();
        }, 100);
      }

      var classList = element.classList; // Lazy load CSS background images

      if (classList.contains(lazyBackgroundClass)) {
        classList.remove(lazyBackgroundClass);
        classList.add(options.lazyBackgroundLoaded || "lazy-bg-loaded");
      }
    };

    var yallBind = function yallBind(element) {
      for (var eventIndex in events) {
        element.addEventListener(eventIndex, events[eventIndex].listener || events[eventIndex], events[eventIndex].options || undefined);
      }

      intersectionListener.observe(element);
    }; // Added because there was a number of patterns like this peppered throughout
    // the code. This just flips necessary data- attrs on an element


    var yallFlipDataAttrs = function yallFlipDataAttrs(element) {
      dataAttrs.forEach(function (dataAttr) {
        if (dataAttr in element.dataset) {
          win["requestAnimationFrame"](function () {
            element[dataAttr] = element.dataset[dataAttr];
          });
        }
      });
    };

    var lazyElements = queryDOM(); // If the current user agent is a known crawler, immediately load all media
    // for the elements yall is listening for and halt execution (good for SEO).

    if (/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent)) {
      for (var lazyElementIndex in lazyElements) {
        yallLoad(lazyElements[lazyElementIndex]);
      }

      return;
    }

    if (io in win && io + "Entry" in win) {
      var intersectionListener = new win[io](function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio) {
            var element = entry.target;

            if (ric in win && idleLoadTimeout) {
              win[ric](function () {
                yallLoad(element);
              }, {
                timeout: idleLoadTimeout
              });
            } else {
              yallLoad(element);
            }

            setTimeout(function () {
              element.classList.remove(lazyClass);
            }, 200);
            observer.unobserve(element);
            lazyElements = lazyElements.filter(function (lazyElement) {
              return lazyElement != element;
            });

            if (!lazyElements.length && !observeChanges) {
              intersectionListener.disconnect();
            }
          }
        });
      }, {
        rootMargin: ("threshold" in options ? options.threshold : 200) + "px 0%"
      });

      for (var _lazyElementIndex in lazyElements) {
        yallBind(lazyElements[_lazyElementIndex]);
      }

      if (observeChanges) {
        new MutationObserver(function () {
          queryDOM().forEach(function (newElement) {
            if (lazyElements.indexOf(newElement) < 0) {
              lazyElements.push(newElement);
              yallBind(newElement);
            }
          });
        }).observe(queryDOM(options.observeRootSelector || "body")[0], options.mutationObserverOptions || {
          childList: true,
          subtree: true
        });
      }
    }
  }

  return yall;

}());
