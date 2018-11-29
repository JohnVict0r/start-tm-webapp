export const priorities = [
  {
    value: 5,
    style: { color: '#D64242', transform: 'rotateZ(90deg)' },
    icon: 'double-left',
    label: 'altíssima',
  },
  { value: 4, style: { color: '#FA8C16' }, icon: 'up', label: 'alta' },
  { value: 3, style: { color: '#74C080' }, icon: 'minus', label: 'normal' },
  { value: 2, style: { color: '#56CDFC' }, icon: 'down', label: 'baixa' },
  {
    value: 1,
    style: { color: '#56CDFC', transform: 'rotateZ(90deg)' },
    icon: 'double-right',
    label: 'baixíssima',
  },
];

export const priorityFilter = priority => priorities.find(p => p.value === priority);

export const status = [
  { value: 'status.todo', color: '#56cdfc', label: 'à fazer' },
  { value: 'status.doing', color: '#79589f', label: 'fazendo' },
  { value: 'status.done', color: '#74c080', label: 'feito' },
  { value: 'status.paused', color: '#7D7D8E', label: 'pausado' },
  { value: 'status.canceled', color: '#e36b2b', label: 'cancelado' },
];

export const statusFilter = statusName => status.find(s => s.value === statusName);
