export interface Member {
    id:          number;
    name:        string;
    image:       string;
    description: string;
    facebookUrl: string;
    linkedinUrl: string;
    created_at?:  Date;
    updated_at?:  Date;
    deleted_at?:  null;
    group_id:    null;
}