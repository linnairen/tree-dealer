/**
 * 树形数据工具集
 */
export namespace Tree {
  /**
   * 树元素
   */
  interface TreeItem {
    /**
     * 是否叶子节点
     */
    is_leaf: boolean,
    [k: string]: any
  }
  /**
   * 把扁平数据转化为树形数据
   * @param Arr 扁平数据
   * @param IdKey 唯一值键值
   * @param ParentKey 父级唯一值键值
   * @param ParentValue 父级唯一值
   * @param ChildrenKey 子树键值
   */
  export function ArrayToTree(Arr: TreeItem[], IdKey: string, ParentKey: string, ParentValue: any, ChildrenKey: string = 'children', level: number = 1) {
    /**
     * 结果树形数据
     */
    let FinalArr: TreeItem[] = []
    /**
     * 源数据
     */
    let OriginArr: TreeItem[] = JSON.parse(JSON.stringify(Arr))
    /**
     * 获取子节点
     * @param Parent 父级数组
     * @param ParentValue 父级唯一值
     * @param OriginArr 源数据
     */
    function SetChildren(Parent: Array<TreeItem>, ParentValue: any, OriginArr: TreeItem[], level1: number) {
      Parent.push(...OriginArr.filter(it => it[ParentKey] === ParentValue).map(it => ({ ...it, level: level1 })))
      Parent.forEach(it => {
        if (it.is_leaf === false) {
          it[ChildrenKey] = []
          SetChildren(it[ChildrenKey], it[IdKey], OriginArr.filter(it => it[ParentKey] !== ParentValue), level1+1)
        }
      })
    }
    SetChildren(FinalArr, ParentValue, OriginArr, level)
    return FinalArr
  }

  /**
   * 树形数据查询，查询规则：父节点符合标准则子节点不进行查询
   * @param TreeArr 树形数据
   * @param QueryString 查询字符串
   * @param QueryKey 查询键值
   * @param ChildrenKey 子节点键值
   */
  export function TreeQuery(TreeArr: TreeItem[], QueryString: string, QueryKey: string, strict: boolean = false, ChildrenKey: string = 'children') {
    /**
     * 源数据
     */
    let OriginArr: TreeItem[] = JSON.parse(JSON.stringify(TreeArr))
    /**
     * 递归筛选数据，规则：优先筛选子节点
     * @param OriginArr 树形数据
     */
    function FilterChild(OriginArr: TreeItem[]) {
      OriginArr.forEach(it => {
        if (strict ? (String(it[QueryKey]) !== QueryString) : (String(it[QueryKey]).indexOf(QueryString) === -1)) {
          if(it.is_leaf === false && it[ChildrenKey] && it[ChildrenKey].length) {
            it[ChildrenKey] = FilterChild(it[ChildrenKey])
          }
        }
      })
      return OriginArr.filter(it => (strict ? (String(it[QueryKey]) === QueryString) : (String(it[QueryKey]).indexOf(QueryString) !== -1)) || (it[ChildrenKey] && it[ChildrenKey].length))
    }
    return FilterChild(OriginArr)
  }

  /**
   * 获取树形数据的所有数据路径
   * @param TreeArr 树形数据
   * @param Key 路径键值
   * @param ChildrenKey 子节点键值
   */
  export function TreeGetPath(TreeArr: TreeItem[], Key: string, ChildrenKey: string = 'children') {
    let StrArr: any[][] = []
    /**
     * 获取叶子节点的数据路径
     * @param A 树形数据
     * @param S 传递路径
     */
    function FindEndPath(A: TreeItem[], S: string[]) {
      A.forEach(it => {
        if (it.is_leaf) {
          StrArr.push(S.concat(it[Key]))
        } else {
          FindEndPath(it[ChildrenKey], S.concat(it[Key]))
        }
      })
    }
    FindEndPath(TreeArr, [])
    return StrArr
  }
  /**
   * 获取树形数据的想要的数据路径
   * @param TreeArr 树形数据
   * @param Key 路径键值
   * @param Value 想搜索的路径值
   * @param strict 严格查询
   * @param ChildrenKey 子节点键值
   */
  export function TreeFindPath(TreeArr: TreeItem[], Key: string, Value: any, strict: boolean = false, ChildrenKey: string = 'children') {
    let StrArr: any[][] = []
    /**
     * 获取叶子节点的数据路径
     * @param A 树形数据
     * @param S 传递路径
     */
    function FindPath(A: TreeItem[], S: string[]) {
      A.forEach(it => {
        if (strict ? (String(it[Key]) === Value) : (String(it[Key]).indexOf(Value) > -1)) {
          StrArr.push(S.concat(it[Key]))
        } else {
          it[ChildrenKey] && FindPath(it[ChildrenKey], S.concat(it[Key]))
        }
      })
    }
    FindPath(TreeArr, [])
    return StrArr
  }
  /**
   * 由一个数据路径找出另一个数据路径
   * @param TreeArr 树形数据
   * @param Key 期望数据路径键值
   * @param IdKey 已有数据路径键值
   * @param IdPath 已有数据路径
   * @param ChildrenKey 子节点键值
   */
  export function TreeSinglePathFromId(TreeArr: TreeItem[], Key: string, IdKey: string, IdPath: any[], ChildrenKey: string = 'children') {
    let Path:any[] = []
    function FindPath(A: TreeItem[], level: number) {
      A.forEach(it => {
        if (it[IdKey] === IdPath[level]) {
          Path.push(it[Key])
          if (!it.is_leaf && it[ChildrenKey]) {
            FindPath(it[ChildrenKey], level + 1)
          }
        }
      })
    }
    FindPath(TreeArr, 0)
    return Path
  }
}

export default {
  Tree: Tree
}