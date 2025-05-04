class Resume {
    constructor(data) {
        this.userId = data.userId;
        this.title = data.title;
        this.template = data.template;
        this.sections = data.sections || [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    toFirestore() {
        return {
            userId: this.userId,
            title: this.title,
            template: this.template,
            sections: this.sections,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromFirestore(doc) {
        const data = doc.data();
        return new Resume({
            id: doc.id,
            ...data
        });
    }
}

module.exports = Resume;