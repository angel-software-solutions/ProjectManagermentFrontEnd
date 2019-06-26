import { TreeviewItem } from "ngx-treeview";

export class Geography {
  public Guid: string;
  public Name: string;
  public GeographyGuid: string;

  public CreatedDate: Date;
  public Root: Geography;
  public text: string;
  public value: string;
  public checked: boolean;
  public children: any[];
  public TreeViewItem: TreeviewItem[];
}
