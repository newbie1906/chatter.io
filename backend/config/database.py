from sqlalchemy import create_engine, MetaData

engine = create_engine('mysql+pymysql://root:password@db:3306/chatterio')

meta = MetaData()
conn = engine.connect()