console.log(displayDiff('hel1thankyou2', 'helthankyou3'));
// console.log(displayDiff('same_prefix_12533_same_suffix', 'same_prefix23123_same_suffix'));
// console.log('result: same_prefix(_)[23]12(53)3_same_suffix'
// );
export function displayDiff(oldVersion, newVersion) {
  var result = solutionTree(oldVersion, newVersion).walkTree();
  return constructString(result);
}

export function solutionTree(original, updated, trunk) {
  var result;
  trunk = trunk || 0; //different handling for first node
  var topNode = longestCommon(original, updated)[0];
  if (topNode === undefined) {
    topNode = '';
  }
  var originalSplice = splicePiece(original, topNode);
  var updatedSplice = splicePiece(updated, topNode);
  var originalLeft = originalSplice.left;
  var updatedLeft = updatedSplice.left;
  var originalRight = originalSplice.right;
  var updatedRight = updatedSplice.right;
  if (trunk === 0) {
    result = new treeMaker({
      original: topNode,
      updated: topNode
    });
  } else {
    result = new treeMaker({
      original: original,
      updated: updated
    });
  }
  if (longestCommon(originalLeft, updatedLeft).length === 0) {
    result.addLeft({
      original: originalLeft,
      updated: updatedLeft
    });
  } else {
    result.left = solutionTree(originalLeft, updatedLeft, trunk + 1);
  }
  if (longestCommon(originalRight, updatedRight).length === 0) {
    result.addRight({
      original: originalRight,
      updated: updatedRight
    });
  } else {
    result.right =  solutionTree(originalRight, updatedRight, trunk + 1);
  }
  return result;
}

export function treeMaker(value) {
  this.value = value;
  this.addLeft = function(value) {
    this.left = new treeMaker(value);
  };
  this.addRight = function(value) {
    this.right = new treeMaker(value);
  };
  this.walkTree = function(result, depth) {
    depth = depth || 0;
    result = result || [];

    // if (depth !== 0 && (this.left === '' || this.left === undefined) && (this.right === '' || this.right === undefined)) {
    //   result.push(this.value);
    // }
    if (this.left !== undefined) {
      this.left.walkTree(result, depth + 1);
    }
    // if (depth === 0) {
    result.push(this.value);
    // }
    if (this.right !== undefined) {
      this.right.walkTree(result, depth + 1);
    }
    return result;
  };
}

export function splicePiece(str, seg) {
  var len = seg.length;
  var start = str.indexOf(seg);
  return {
    segment: seg,
    left: str.substring(0, start),
    right: str.substring(start + len, str.length)
  };
}

export function constructString(arr) {
  var result = '';
  arr.forEach(function(segment) {
    if (segment.original === segment.updated) result += segment.original;
    else if (segment.updated === '') result += '(' + segment.original + ')';
    else if (segment.original === '') result += '[' + segment.updated + ']';
    else if (segment.updated.length > 0 && segment.original.length > 0) result += '(' + segment.original + ')' + '[' + segment.updated + ']';
    else {
      result += '<something broke>';
      console.log('broken segment: ', segment);
    }
  });
  return result;
}

export function longestCommon(s1, s2) {
  var len1 = s1.length,
    len2 = s2.length,
    matrix = [],
    max = 0,
    result = [];

  for (var i = 0; i < len1; i++) {
    matrix[i] = []; //initialize new row in matrix
    for (var j = 0; j < len2; j++) {
      if (s1.charAt(i) === s2.charAt(j)) { //equivalent characters
        if (i === 0 || j === 0) matrix[i][j] = 1; //first rows
        else matrix[i][j] = (matrix[i - 1][j - 1] + 1); //add 1 to diagonal
        if (matrix[i][j] > max) {
          max = matrix[i][j];
          result = []; //reinitialize result array
          result.push(s1.substring(i - max + 1, i + 1));
        } else if (matrix[i][j] === max) { //same length, just push into array
          result.push(s1.substring(i - max + 1, i + 1));
        }
      } else matrix[i][j] = 0;
    }
  }

  return result;
}
