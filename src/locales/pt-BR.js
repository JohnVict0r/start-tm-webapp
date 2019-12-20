import admin from './pt-BR/admin';
import exception from './pt-BR/exception';
import form from './pt-BR/form';
import globalHeader from './pt-BR/globalHeader';
import layout from './pt-BR/layout';
import login from './pt-BR/login';
import menu from './pt-BR/menu';
import register from './pt-BR/register';
import result from './pt-BR/result';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';
import validation from './pt-BR/validation';
import pwa from './pt-BR/pwa';
import component from './pt-BR/component';

// start tm
import club from './pt-BR/club';
import federation from './pt-BR/federation';
import event from './pt-BR/event';

export default {
  'navBar.lang': 'Idiomas',
  'app.home.introduce': 'introduzir',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Páginas de formulário são usadas para coletar e verificar as informações dos usuários e formulários básicos são comuns nos cenários onde existem alguns formatos de informações.',
  ...admin,
  ...exception,
  ...form,
  ...globalHeader,
  ...layout,
  ...login,
  ...menu,
  ...register,
  ...result,
  ...settingDrawer,
  ...settings,
  ...validation,
  ...pwa,
  ...component,

  // start tm
  ...event,
  ...club,
  ...federation,
};
