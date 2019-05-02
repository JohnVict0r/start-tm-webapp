import admin from './pt-BR/admin';
import analysis from './pt-BR/analysis';
import exception from './pt-BR/exception';
import form from './pt-BR/form';
import globalHeader from './pt-BR/globalHeader';
import layout from './pt-BR/layout';
import login from './pt-BR/login';
import menu from './pt-BR/menu';
import monitor from './pt-BR/monitor';
import project from './pt-BR/project';
import team from './pt-BR/team';
import register from './pt-BR/register';
import result from './pt-BR/result';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';
import card from './pt-BR/card';
import comment from './pt-BR/comment';
import validation from './pt-BR/validation';
import pwa from './pt-BR/pwa';
import component from './pt-BR/component';

export default {
  'navBar.lang': 'Idiomas',
  'app.home.introduce': 'introduzir',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Páginas de formulário são usadas para coletar e verificar as informações dos usuários e formulários básicos são comuns nos cenários onde existem alguns formatos de informações.',
  ...admin,
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...layout,
  ...login,
  ...menu,
  ...monitor,
  ...project,
  ...team,
  ...register,
  ...result,
  ...settingDrawer,
  ...settings,
  ...validation,
  ...pwa,
  ...card,
  ...comment,
  ...component,
};
