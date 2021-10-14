import { SERVICES } from '../shared/constants';

export const getRecordsTime = () => {
  const time = [];
  for (let i = 0; i < 21; i++) {
    time.push(`${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`);
  }
  return time;
};

export const getWorksTime = () => {
  const time = [];
  for (let i = 0; i < 9; i++) {
    time.push(`${1 + Math.floor(i / 4)}:${i % 4 === 0 ? '00' : (i * 15) % 60}`);
  }
  return time;
};

export function getNameServicesFromId(ids: string[]): string[] {
  return ids.map((id) => SERVICES.find((service) => service.id === id)?.text || '');
}

export function getSelectedServiceOptions(ids: string[]): { text: string; id: string }[] {
  const names = getNameServicesFromId(ids);
  return names.map((name) => SERVICES.filter((service) => service.text === name)[0]);
}

export function getIdFromServices(services: { id: string; text: string }[]): string[] {
  return services.map((service) => service.id);
}
