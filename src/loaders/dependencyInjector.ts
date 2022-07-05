import { Container } from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import config from '../config';
import mailgun from 'mailgun-js';

export default ({ models }: {models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('logger', LoggerInstance)

    // const agendaInstance = agendaFactory({ mongoConnection });

    // Container.set('agendaInstance', agendaInstance);
    // Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }))

    // LoggerInstance.info('✌️ Agenda injected into container');

    return true;
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
