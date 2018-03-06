import winston from 'winston';
import moment from 'moment';

const configWinstonLog = () => {

	const commonOptions = {
		colorize: 'all',
		timestamp() {
			return moment().format();
		}
	};
	
	const transports = [new winston.transports.Console(commonOptions)];
	
	if (global.MODE === 'prod' && !global.UAT) {
		require('winston-daily-rotate-file');
		transports.push(
			new winston.transports.DailyRotateFile(
				_.assign({}, commonOptions, {
					filename: path.resolve(global.PATHS.logs, 'app.log'),
					datePattern: 'yyyy-MM-dd.',
					localTime: true,
					prepend: true,
					maxDays: 30,
					json: false,
				})
			)
		);
	}
	
	global.l = new winston.Logger({
		level: 'dev',
		// level: 'debug',
		padLevels: true,
		levels: {
			error: 0,
			warn: 1,
			notice: 2,
			info: 3,
			debug: 4,
		},
		colors: {
			error: 'red',
			warn: 'yellow',
			notice: 'green',
			info: 'black',
			debug: 'blue',
		},
		transports,
	});	
};

configWinstonLog();