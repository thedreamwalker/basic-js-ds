const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    //пустой корень, нельзя называть просто root, потому что имя занято методом
    this.rootTree = null;
  }

  root() {
    // возвращаем корень
      return this.rootTree;
  }

  add(data) {
    // создаем новый узел со значением data
    const newNode = new Node(data);

    //начинаем движение с корня, используя рекурсивную (вызывает сама себя) функцию
    this.rootTree = addNode(this.rootTree, data);

    function addNode(node, data) {
      // если узел пустой (ничего не содержит), создаем его со значением data
      if (!node) {
        return newNode;
      }

      // если узел содержит то же значение, что мы хотим передать, ничего не делаем
      if (node.data === data) {
        return node;
      }

      // если он не пустой и не с тем же значением, то запускаем проверку
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
    
  }

  has(data) {
    function searchNode(node, data) {

      //если нода пустая, то искомого значения нет - false
      if (!node) {
        return false;
      }

      // если совпадает с тем, что ищем - то значение есть
      if (node.data === data) {
        return true;
      }

      // если ничего из этого, делаем проверки потомков, в зависимости от того искомое значение больше или меньше значения текущего узла
      // помним, что в бинарном дереве значения узлов слева всегда меньше значения родителя, справа наоборот больше

      if (data < node.data) {
        return searchNode(node.left, data);
      }

      if (data > node.data) {
        return searchNode(node.right, data);
      }
    }

    return searchNode(this.rootTree, data);
  }

  find(data) {
    function searchNode(node, data) {

      //если нода пустая, то искомого значения нет - false
      if (!node) {
        return null;
      }

      // если совпадает с тем, что ищем - то значение есть
      if (node.data === data) {
        return node;
      }

      // если ничего из этого, делаем проверки потомков, в зависимости от того искомое значение больше или меньше значения текущего узла
      // помним, что в бинарном дереве значения узлов слева всегда меньше значения родителя, справа наоборот больше

      if (data < node.data) {
        return searchNode(node.left, data);
      }

      if (data > node.data) {
        return searchNode(node.right, data);
      }
    }
    return searchNode(this.rootTree, data);
  }

  remove(data) {
    function removeNode(node, data) {
      //если нода пустая, то искомого значения нет - false
      if (!node) {
        return null;
      }

      if (data < node.data) {
        // удаляем узел из ветки слева и после этого присваиваем ей новое состояние
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        // удаляем узел из ветки справа и после этого присваиваем ей новое состояние
        node.right =  removeNode(node.right, data);
        return node;
      } else {
        // искомый узел, значения равны
        // теперь нужно узнать если ли у него потомки. если нет и он пустой просто убрать
        if (!node.left && !node.right) {
          return null;
        }

        // если есть правый или левый нужно после удаления значения узла текущего заменить на потомка справа/слева
        // чтобы не потерялась связь в дереве

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        // eсть и то и другое. можно искать справа минимальное на замену в текущий узел
        // либо слева максимальное. чтобы сохранялось правило о том что слева от узла значения меньше, справа - больше 
        // "стартовое" значение правой ветки от текущего узла
        let minFromRigth = node.right;

        // идем по левой ветке, потому что слева всегда меньшие значения, а мы ищем минимальное
        while (minFromRigth.left) {
          minFromRigth = minFromRigth.left;
        }
        // присваиваем текущему узлу значение найденного минимального значения 
        node.data = minFromRigth.data;
        
        // теперь нужно из правой ветки удалить наименьший узел, потому что его значение стало текущим узлом

        node.right = removeNode(node.right, minFromRigth.data);

        return node;
      }
    }

    //начинаем обход с корня дерева this.rootTree
    return removeNode(this.rootTree, data);
  }

  min() {

    if (!this.rootTree) {
      return;
    }

    let minNode = this.rootTree;

    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  max() {

    if (!this.rootTree) {
      return;
    }

    let maxNode = this.rootTree;

    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};