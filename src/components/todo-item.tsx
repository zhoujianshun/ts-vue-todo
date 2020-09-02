import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import '@/components/index.scss'


export interface IItem {
    text: string;
    complete: boolean;
}

@Component({
    name: 'TodoItem',
})
export default class TodoItem extends Vue {
    @Prop(Object) public item!: IItem;
    @Prop(Number) public index!: number;
    @Prop(Number) public editingIndex!: number;

    public editingContent = '';

    @Watch('editingIndex')
    public editingIndexChanged(index: number) {
        if (index === this.index) {
            this.editingContent = this.item.text
        } else {
            this.editingContent = ''
        }
    }

    // @Emit('on-save')
    // public save(index: number, editingContent: string) {
    //     console.log(editingContent)
    //     return {
    //         index,
    //         content: editingContent,
    //     }
    // }
    public save = (event: Event) => {
        event.stopPropagation();
        this.$emit('on-save', {
            index: this.index,
            content: this.editingContent,
        });
        // this.editingContent = ''
    }
    public edit = (index: number, event: Event) => {
        event.stopPropagation(); // 阻止冒泡
        this.$emit('on-edit', index);
    }

    @Emit()
    public onCancel(event: Event) {
        // this.editingContent = ''

        // this.$emit('on-cancel', this.index);
        event.stopPropagation();
        return this.index
    }

    // public complete = () => {
    //     this.$emit("on-complete", this.index)
    // }
    @Emit()
    public onComplete(event: Event) {

        return this.index
    }

    public contentChange = (e: Event) => {
        // console.log( e.target!.value)
        const { value } = e.currentTarget! as HTMLInputElement
        this.editingContent = value

    }

    public render() {
        return (
            <li class='item-wrap' on-click={this.onComplete}>
                {
                    this.editingIndex === this.index ?
                        (<div>
                            <a-input value={this.editingContent} on-change={this.contentChange}></a-input>
                            <a-icon type='check'
                                nativeOn-click={this.save}></a-icon>
                            <a-icon type='close' nativeOn-click={this.onCancel}></a-icon>
                        </div>)
                        :
                        (<div>
                            <span
                                style={this.item.complete ? { textDecoration: 'line-through' } : {}}>
                                {this.item.text}
                            </span>
                            <a-icon type='edit' nativeOn-click={this.edit.bind(this, this.index)}></a-icon>
                        </div>)
                }
            </li>

        );
    }
}
