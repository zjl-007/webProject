import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import { 
    Button,
    Form,
    FormItem,
    Input,
    Row,
    Header,
    Footer,
    Aside,
    Container,
    Main,
    Message,
    MessageBox,
    Radio,
    RadioGroup,
    RadioButton,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup
} from 'element-ui';

Vue.use(Button);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Container);
Vue.use(Main);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);