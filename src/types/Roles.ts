export enum Roles {
  Administrator = "GROUP_ADMINISTRATORS",
  Customer = "GROUP_PARTICIPANTS",
  Agent = "GROUP_AGENTS",
  Observer = "GROUP_OBSERVERS",
  Anonymous = "GROUP_ANONYMOUS",
}

export interface ISecurityGroup {
  id: string;
  is_editable: boolean;
  slug: Roles;
  title: [
    {
      description: string;
      id: string;
      language: {
        lang_key: string;
      };
      title: string;
    },
  ];
}
