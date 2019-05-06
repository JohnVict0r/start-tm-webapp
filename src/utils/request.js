/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import moment from 'moment';

// When converting moment objects to JSON use format()
// eslint-disable-next-line
moment.fn.toJSON = function() {
  return this.format();
};

const codeMessage = {
  200: 'O servidor retornou com sucesso os dados solicitados.',
  201: 'Dados novos ou modificados são bem sucedidos.',
  202: 'Uma solicitação entrou na fila de segundo plano (tarefa assíncrona).',
  204: 'Os dados foram excluídos com sucesso.',
  400: 'A solicitação foi feita com um erro e o servidor não executou nenhuma operação de dados nova ou modificada.',
  401: 'Usuário não está autenticado.',
  403: 'Usuário não tem permissão de acesso.',
  404: 'Recurso não encontrado.',
  406: 'O formato da solicitação não está disponível.',
  410: 'O recurso solicitado foi permanentemente excluído e não será recuperado.',
  422: 'Ocorreu um erro de validação.',
  500: 'Ocorreu um erro no servidor.',
  502: 'Erro de gateway.',
  503: 'O serviço está indisponível e o servidor está temporariamente sobrecarregado.',
  504: 'O gateway expirou.',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status !== 422) {
    notification.error({
      message: `Erro de solicitação ${status}: ${url}`,
      description: errortext,
    });
  }

  if (status === 401) {
    notification.error({
      message: 'Você não está logado ou o login expirou, por favor, faça o login novamente.',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
    return;
  }
  // Propagate the error
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
