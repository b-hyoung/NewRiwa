def instance_save(instance, commit):
	if commit:
		try:
			instance.save()
		except Exception as e:
			print(e)
		else :
			pass
	return instance