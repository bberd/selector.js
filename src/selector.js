var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;

  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // YOUR CODE HERE



//solution code
if (matchFunc(startEl)) {
  resultSet.push(startEl);
}
if (startEl.children.length) {
  [].slice.call(startEl.children).forEach(function (child) {
    var matchingElementsStartingAtchild = traverseDomAndCollectElements(matchFunc, child);
    resultSet = resultSet.concat(matchingElementsStartingAtchild);
  });
}



//our attempt
  //console.log(startEl.children);
    function GoDownTree(startEl) {

    let childArr = [].slice.call(startEl.children);


    if (childArr.length > 0) {
      GoDownTree(matchFunc, childArr.slice(1));
      if (matchFunc(childArr[0])) {
        resultSet.push(childArr[0]);
        console.log(resultSet);
      }
    } else {
      resultSet.push(startEl);
    }
  }

  GoDownTree(startEl);


  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  var tag = false;
  var hashtag = false;
  for (var i = 0; i < selector.length; i++) {
    if (selector[i] === ".") {
      tag = true;
    }
    if (selector[i] === "#") {
      hashtag = true;
    }
  }

  if (selector[0] === "#") {
    return "id";
  } else if (selector[0] === ".") {
    return "class";
  } else if (tag && selector[0] != ".") {
    return "tag.class";
  } else if (!hashtag && !tag) {
    return "tag";
  }
  // your code here
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(element) {
      return element.id === selector.slice(1);
    }
  } else if (selectorType === "class") {
      matchFunction = function(element) {
      for(let i = 0; i < element.className.split(' ').length; i++) {
        if(element.className.split(' ')[i] === selector.slice(1))
          return true;
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
      matchFunction = function(element) {

        let selector1 = selector.split('.');
        let tag = selector1[0]; // elector img
        let classN = selector1[1]; // selector thumbail

        var found = false;

        for(let i = 0; i < element.className.split(' ').length; i++) {
          if(element.className.split(' ')[i] === classN)
            found = true;
        }
        return (element.tagName && element.tagName.toLowerCase() === tag.toLowerCase() && found === true);

       }


  } else if (selectorType === "tag") {
    matchFunction = function(element) {
      return element.tagName && element.tagName.toLowerCase() === selector.toLowerCase();
    }
  }

  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
